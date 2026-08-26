import React from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

export default function Topic0() {
    return (
        <div className="space-y-14">

            {/* ================= HEADER ================= */}
            <header className="space-y-3">
                <h2 className="text-2xl font-bold text-sky-300">
                    Control Flow and Decision Making in C
                </h2>
                <p className="text-slate-300 text-sm md:text-base">
                    SVG diagrams below visually explain how control flows
                    through conditions and selections in a C program.
                </p>
            </header>

            {/* ===================================================== */}
            {/* IF / ELSE */}
            {/* ===================================================== */}
            <section className="space-y-5">
                <h3 className="text-xl font-semibold text-sky-200">
                    if, else-if and else Statements
                </h3>

                {/* SVG FLOW */}
                <svg viewBox="0 0 500 180" className="w-full bg-slate-900 rounded-xl">
                    <rect x="200" y="10" width="100" height="40" rx="8" fill="#38bdf8" />
                    <text x="250" y="35" textAnchor="middle" fill="#020617">Condition</text>

                    <line x1="250" y1="50" x2="120" y2="120" stroke="#94a3b8" />
                    <line x1="250" y1="50" x2="380" y2="120" stroke="#94a3b8" />

                    <rect x="60" y="120" width="120" height="40" rx="8" fill="#22c55e" />
                    <rect x="320" y="120" width="120" height="40" rx="8" fill="#f87171" />

                    <text x="120" y="145" textAnchor="middle" fill="#020617">TRUE Block</text>
                    <text x="380" y="145" textAnchor="middle" fill="#020617">FALSE Block</text>
                </svg>

                <EditableCCodeBlock
                    title="Example 1: Age Check"
                    initialCode={`int age = 20;

if (age >= 18)
    printf("Eligible");`}
                />

                <EditableCCodeBlock
                    title="Example 2: Grading"
                    initialCode={`int marks = 72;

if (marks >= 90)
    printf("A");
else if (marks >= 60)
    printf("B");
else
    printf("C");`}
                />

                <EditableCCodeBlock
                    title="Example 3: Number Check"
                    initialCode={`int n = -3;

if (n > 0)
    printf("Positive");
else
    printf("Negative or Zero");`}
                />

                <p className="text-slate-500 text-xs">
                    📝 <strong>Note:</strong> Every <code>if</code> condition must evaluate to
                    TRUE (non-zero) or FALSE (zero).
                </p>
            </section>

            {/* ===================================================== */}
            {/* NESTED CONDITIONS */}
            {/* ===================================================== */}
            <section className="space-y-5">
                <h3 className="text-xl font-semibold text-sky-200">
                    Nested Conditions and Readability
                </h3>

                <svg
                    viewBox="0 0 800 360"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full bg-slate-900 rounded-xl p-4"
                >
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#e5e7eb" />
                        </marker>
                    </defs>

                    {/* Condition 1 */}
                    <rect x="300" y="20" width="200" height="60" rx="12" fill="#38bdf8" />
                    <text x="400" y="58" textAnchor="middle" fontSize="20" fill="#020617">
                        Condition 1
                    </text>

                    {/* Down */}
                    <line x1="400" y1="80" x2="400" y2="130" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />

                    {/* Condition 2 */}
                    <rect x="300" y="130" width="200" height="60" rx="12" fill="#38bdf8" />
                    <text x="400" y="168" textAnchor="middle" fontSize="20" fill="#020617">
                        Condition 2
                    </text>

                    {/* Outcomes */}
                    <line x1="400" y1="190" x2="200" y2="280" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="400" y1="190" x2="600" y2="280" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />

                    <rect x="120" y="280" width="160" height="60" rx="12" fill="#22c55e" />
                    <rect x="520" y="280" width="160" height="60" rx="12" fill="#f87171" />

                    <text x="200" y="318" textAnchor="middle" fontSize="18" fill="#020617">Action A</text>
                    <text x="600" y="318" textAnchor="middle" fontSize="18" fill="#020617">Action B</text>
                </svg>


                <EditableCCodeBlock
                    title="Example 1: Driving Eligibility"
                    initialCode={`if (age >= 18) {
    if (hasLicense)
        printf("Drive");
}`}
                />

                <EditableCCodeBlock
                    title="Example 2: Login Validation"
                    initialCode={`if (userOK) {
    if (passOK)
        printf("Login OK");
}`}
                />

                <EditableCCodeBlock
                    title="Example 3: Account Type"
                    initialCode={`if (balance > 0) {
    if (balance >= 3000)
        printf("Premium");
}`}
                />

                <p className="text-slate-500 text-xs">
                    📝 <strong>Note:</strong> Excessive nesting reduces readability.
                    Prefer logical operators where possible.
                </p>
            </section>

            {/* ===================================================== */}
            {/* SWITCH */}
            {/* ===================================================== */}
            <section className="space-y-5">
                <h3 className="text-xl font-semibold text-sky-200">
                    switch-case with break and default
                </h3>

                <svg
                    viewBox="0 0 900 300"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full bg-slate-900 rounded-xl p-4"
                >
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#e5e7eb" />
                        </marker>
                    </defs>

                    <rect x="350" y="20" width="200" height="60" rx="12" fill="#38bdf8" />
                    <text x="450" y="58" textAnchor="middle" fontSize="20" fill="#020617">
                        switch(value)
                    </text>

                    {/* Branches */}
                    <line x1="450" y1="80" x2="150" y2="170" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="450" y1="80" x2="450" y2="170" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="450" y1="80" x2="750" y2="170" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />

                    <rect x="80" y="170" width="140" height="60" rx="12" fill="#22c55e" />
                    <rect x="380" y="170" width="140" height="60" rx="12" fill="#22c55e" />
                    <rect x="680" y="170" width="140" height="60" rx="12" fill="#f87171" />

                    <text x="150" y="208" textAnchor="middle" fontSize="18" fill="#020617">case 1</text>
                    <text x="450" y="208" textAnchor="middle" fontSize="18" fill="#020617">case 2</text>
                    <text x="750" y="208" textAnchor="middle" fontSize="18" fill="#020617">default</text>
                </svg>


                <EditableCCodeBlock
                    title="Example 1: Day Selection"
                    initialCode={`switch(day) {
    case 1: printf("Mon"); break;
    default: printf("Invalid");
}`}
                />

                <EditableCCodeBlock
                    title="Example 2: Grade Switch"
                    initialCode={`switch(grade) {
    case 'A': printf("Excellent"); break;
}`}
                />

                <EditableCCodeBlock
                    title="Example 3: Only Default"
                    initialCode={`switch(option) {
    default: printf("Invalid");
}`}
                />

                <p className="text-slate-500 text-xs">
                    📝 <strong>Note:</strong> <code>break</code> prevents fall-through.
                </p>
            </section>

            {/* ===================================================== */}
            {/* MENU */}
            {/* ===================================================== */}
            <section className="space-y-5">
                <h3 className="text-xl font-semibold text-sky-200">
                    Menu-Driven Programs Using switch
                </h3>

                <svg
                    viewBox="0 0 900 300"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full bg-slate-900 rounded-xl p-4"
                >
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#e5e7eb" />
                        </marker>
                    </defs>

                    <rect x="350" y="20" width="200" height="60" rx="12" fill="#38bdf8" />
                    <text x="450" y="58" textAnchor="middle" fontSize="20" fill="#020617">
                        switch(value)
                    </text>

                    {/* Branches */}
                    <line x1="450" y1="80" x2="150" y2="170" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="450" y1="80" x2="450" y2="170" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />
                    <line x1="450" y1="80" x2="750" y2="170" stroke="#e5e7eb" strokeWidth="3" markerEnd="url(#arrow)" />

                    <rect x="80" y="170" width="140" height="60" rx="12" fill="#22c55e" />
                    <rect x="380" y="170" width="140" height="60" rx="12" fill="#22c55e" />
                    <rect x="680" y="170" width="140" height="60" rx="12" fill="#f87171" />

                    <text x="150" y="208" textAnchor="middle" fontSize="18" fill="#020617">case 1</text>
                    <text x="450" y="208" textAnchor="middle" fontSize="18" fill="#020617">case 2</text>
                    <text x="750" y="208" textAnchor="middle" fontSize="18" fill="#020617">default</text>
                </svg>



                <EditableCCodeBlock
                    title="Example 1: Calculator Menu"
                    initialCode={`switch(choice) {
    case 1: printf("Add"); break;
}`}
                />

                <EditableCCodeBlock
                    title="Example 2: Bank Menu"
                    initialCode={`switch(option) {
    case 1: printf("Balance"); break;
}`}
                />

                <EditableCCodeBlock
                    title="Example 3: App Menu"
                    initialCode={`switch(menu) {
    case 2: printf("Exit"); break;
}`}
                />

                <p className="text-slate-500 text-xs">
                    📝 <strong>Note:</strong> Menu-driven logic is extremely common in exams.
                </p>
            </section>

        </div>
    );
}
