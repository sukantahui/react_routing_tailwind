/**
 * File: OperatorPrecedenceAssociativityDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 16)
 * Description: Demonstrates Java operator precedence hierarchy (15 tiers),
 *              Left-to-Right vs Right-to-Left associativity,
 *              precedence traps (additive vs shift, relational vs bitwise, && vs ||),
 *              and composite tax/rebate calculation in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class OperatorPrecedenceAssociativityDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 16 OPERATOR PRECEDENCE & ASSOCIATIVITY");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Additive vs Shift Precedence Trap (+ precedes <<)
        System.out.println("--- 1. ADDITIVE VS SHIFT PRECEDENCE (+ > <<) ---");
        // In '1 + 2 << 2': '+' has higher precedence than '<<'
        // Evaluates as: (1 + 2) << 2 = 3 << 2 = 12 (NOT 1 + (2 << 2) = 9!)
        int shiftTrap = 1 + 2 << 2;
        int shiftExplicit = 1 + (2 << 2);

        System.out.printf("Expression '1 + 2 << 2'     : %d (Grouped as (1 + 2) << 2)%n", shiftTrap);
        System.out.printf("Expression '1 + (2 << 2)'   : %d (Forced multiplication first)%n%n", shiftExplicit);

        // 2. Relational vs Bitwise Precedence Trap (!= precedes &)
        System.out.println("--- 2. RELATIONAL VS BITWISE PRECEDENCE (!= > &) ---");
        int flags = 0b00000100;
        int MASK  = 0b00000100;

        // In 'flags & MASK != 0': '!=' has higher precedence than '&'
        // Writing 'flags & MASK != 0' evaluates as 'flags & (MASK != 0)' -> COMPILE ERROR!
        // Correct syntax requires parentheses:
        boolean isSet = (flags & MASK) != 0;
        System.out.printf("Bit check '(flags & MASK) != 0' : %b (Correctly grouped)%n%n", isSet);

        // 3. Logical Precedence: ! > && > ||
        System.out.println("--- 3. LOGICAL PRECEDENCE: ! > && > || ---");
        boolean a = true, b = false, c = false;
        // 'a || b && c' is grouped as: 'a || (b && c)'
        boolean logicRes = a || b && c; // true || (false && false) -> true || false -> true
        System.out.printf("Expression 'true || false && false' : %b (&& binds tighter than ||)%n%n", logicRes);

        // 4. Right-to-Left Associativity (Unary, Ternary, Assignment)
        System.out.println("--- 4. RIGHT-TO-LEFT ASSOCIATIVE OPERATORS ---");
        // Assignment:
        int x, y, z;
        x = y = z = 100; // Grouped as: x = (y = (z = 100))
        System.out.printf("Chained Assignment 'x = y = z = 100' -> x=%d, y=%d, z=%d%n", x, y, z);

        // Ternary:
        int score = 85;
        // Grouped as: score >= 90 ? "A" : (score >= 75 ? "B" : "C")
        String tier = score >= 90 ? "A" : score >= 75 ? "B" : "C";
        System.out.printf("Chained Ternary -> Tier: %s%n", tier);

        // Unary:
        int val = - - -50; // Grouped as: -(-(-50)) -> -50
        System.out.printf("Chained Unary '- - -50' -> %d%n%n", val);

        // 5. Composite Accounting Formula in Indian Rupees (₹)
        System.out.println("--- 5. BARRACKPORE COMPOSITE SALARY & TAX LEDGER ---");
        calculatePayroll("Swadeep", 45000.0, 5000.0, 0.12, 1500.0);
        calculatePayroll("Tuhina", 60000.0, 8000.0, 0.18, 2000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Postfix (x++) > Unary (++x, !) > Multiplicative (*, /) > Additive (+, -).");
        System.out.println("2. Additive (+, -) > Shift (<<, >>) > Relational (<, >) > Equality (==, !=).");
        System.out.println("3. Equality > Bitwise (&, ^, |) > Logical (&&, ||) > Ternary (? :) > Assignment (=).");
        System.out.println("4. Right-to-Left associative operators: Unary, Ternary (? :), and Assignments (=, +=).");
        System.out.println("5. When in doubt, ALWAYS use parentheses for readability and safety!");
        System.out.println("================================================================================");
    }

    private static void calculatePayroll(String employeeName, double basicSalary, double allowances, double taxRate, double pfDeduction) {
        // Precedence: Multiplicative (basicSalary * taxRate) evaluated first, then Additive:
        double grossSalary = basicSalary + allowances;
        double taxAmount = (basicSalary + allowances) * taxRate; // Parentheses ensure tax applies to gross
        double netSalary = grossSalary - taxAmount - pfDeduction;

        System.out.printf("Employee: %-10s | Gross: ₹%,.2f | Tax: ₹%,.2f | PF: ₹%,.2f | Net: ₹%,.2f%n",
                employeeName, grossSalary, taxAmount, pfDeduction, netSalary);
    }
}
