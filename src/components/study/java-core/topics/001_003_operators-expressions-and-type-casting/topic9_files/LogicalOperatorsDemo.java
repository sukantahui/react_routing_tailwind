/**
 * File: LogicalOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 9)
 * Description: Demonstrates Java logical operators: Logical AND (&&), Logical OR (||),
 *              Logical NOT (!), truth tables, precedence hierarchy (! > && > ||),
 *              De Morgan's Laws, and student scholarship qualification filters in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class LogicalOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 LOGICAL OPERATORS (&&, ||, !)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Logical AND (&&) Truth Table
        System.out.println("--- 1. LOGICAL AND (&&) TRUTH TABLE ---");
        System.out.printf(" true  &&  true  : %b%n", (true && true));
        System.out.printf(" true  && false  : %b%n", (true && false));
        System.out.printf("false  &&  true  : %b%n", (false && true));
        System.out.printf("false  && false  : %b%n%n", (false && false));

        // 2. Logical OR (||) Truth Table
        System.out.println("--- 2. LOGICAL OR (||) TRUTH TABLE ---");
        System.out.printf(" true  ||  true  : %b%n", (true || true));
        System.out.printf(" true  || false  : %b%n", (true || false));
        System.out.printf("false  ||  true  : %b%n", (false || true));
        System.out.printf("false  || false  : %b%n%n", (false || false));

        // 3. Precedence Hierarchy: ! (High) -> && (Medium) -> || (Low)
        System.out.println("--- 3. OPERATOR PRECEDENCE: ! > && > || ---");
        boolean a = true;
        boolean b = false;
        boolean c = false;

        // In Java: 'a || b && c' is grouped as 'a || (b && c)'
        boolean unparenthesized = a || b && c; // true || (false && false) -> true || false -> true
        boolean parenthesized = (a || b) && c;   // (true || false) && false -> true && false -> false

        System.out.printf("Expression 'true || false && false'       : %b (Grouped as true || (false && false))%n", unparenthesized);
        System.out.printf("Expression '(true || false) && false'     : %b (Forced grouping with parentheses)%n%n", parenthesized);

        // 4. De Morgan's Laws Verification
        System.out.println("--- 4. DE MORGAN'S LAWS VERIFICATION ---");
        boolean p = true;
        boolean q = false;

        boolean deMorgan1Left = !(p && q);
        boolean deMorgan1Right = (!p || !q);

        boolean deMorgan2Left = !(p || q);
        boolean deMorgan2Right = (!p && !q);

        System.out.printf("Law 1: !(p && q) == (!p || !q) : %b (Both evaluate to: %b)%n",
                (deMorgan1Left == deMorgan1Right), deMorgan1Left);
        System.out.printf("Law 2: !(p || q) == (!p && !q) : %b (Both evaluate to: %b)%n%n",
                (deMorgan2Left == deMorgan2Right), deMorgan2Left);

        // 5. Real-World Student Admission & Scholarship Evaluator (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT ADMISSION & SCHOLARSHIP AUDITOR ---");
        auditStudentAdmission("Swadeep", 92, 95, true, 15000.0);
        auditStudentAdmission("Tuhina", 88, 70, false, 22000.0);
        auditStudentAdmission("Abhronila", 94, 91, false, 18000.0);
        auditStudentAdmission("Debangshu", 65, 80, true, 25000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. '&&' requires ALL conditions to be true; '||' requires AT LEAST ONE condition.");
        System.out.println("2. Logical operator precedence: '!' precedes '&&', which precedes '||'.");
        System.out.println("3. De Morgan's Laws: !(A && B) == (!A || !B) and !(A || B) == (!A && !B).");
        System.out.println("4. Always use parentheses when mixing '&&' and '||' for unambiguous business logic.");
        System.out.println("================================================================================");
    }

    private static void auditStudentAdmission(String name, int academicMarks, int entranceScore, boolean isEarlyBird, double courseFee) {
        // Compound eligibility logic:
        // Qualified if (academic >= 85 AND entrance >= 90) OR (isEarlyBird AND entrance >= 75)
        boolean isMeritEligible = (academicMarks >= 85 && entranceScore >= 90);
        boolean isEarlyBirdEligible = (isEarlyBird && entranceScore >= 75);
        boolean isAdmitted = isMeritEligible || isEarlyBirdEligible;

        double scholarshipDiscount = isMeritEligible ? (courseFee * 0.20) : (isEarlyBirdEligible ? (courseFee * 0.10) : 0.0);
        double netPayableFee = courseFee - scholarshipDiscount;

        System.out.printf("Student: %-10s | Acad: %2d%% | Entrance: %2d | EarlyBird: %-5b | Admitted: %-5b | Net Fee: ₹%,.2f %s%n",
                name, academicMarks, entranceScore, isEarlyBird, isAdmitted, netPayableFee,
                (scholarshipDiscount > 0 ? "(★ ₹" + String.format("%,.2f", scholarshipDiscount) + " Scholarship)" : ""));
    }
}
