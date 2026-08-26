/**
 * File: FormalParametersVsArgumentsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 3)
 * Description: Demonstrates the critical distinction between Formal Parameters and Actual Arguments:
 *              1. Formal parameters as stack frame placeholders in method headers
 *              2. Actual arguments as evaluated expressions/literals at invocation call sites
 *              3. Type compatibility, widening conversions, and order constraints
 *              for student fee ledger processing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class FormalParametersVsArgumentsDemo {

    /**
     * METHOD WITH FORMAL PARAMETERS:
     * 'studentName' -> Formal Parameter 1 (String)
     * 'monthlyFee'   -> Formal Parameter 2 (double)
     * 'months'       -> Formal Parameter 3 (int)
     * 'isScholarship'-> Formal Parameter 4 (boolean)
     */
    public static double computeTotalFee(String studentName, double monthlyFee, int months, boolean isScholarship) {
        // Formal parameters act as local variables within this method's stack frame:
        double gross = monthlyFee * months;
        double discount = isScholarship ? (gross * 0.10) : 0.0;
        double net = gross - discount;

        System.out.printf("  [STACK FRAME: computeTotalFee] Student: %-10s | Net Fee: ₹%,.2f%n", studentName, net);
        return net;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 3 PARAMETERS VS ARGUMENTS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- CALL SITE INVOCATIONS WITH DIVERSE ACTUAL ARGUMENTS ---\n");

        // 1. Passing Literal Constants as Actual Arguments:
        System.out.println("1. Invoking with Literal Constants as Arguments:");
        computeTotalFee("Swadeep", 4000.0, 6, true);

        // 2. Passing Variables as Actual Arguments:
        System.out.println("\n2. Invoking with Variables as Arguments:");
        String candidate = "Tuhina";
        double baseRate = 5000.0;
        int duration = 4;
        boolean hasMerit = false;
        computeTotalFee(candidate, baseRate, duration, hasMerit);

        // 3. Passing Complex Expressions as Actual Arguments (Evaluated before method call):
        System.out.println("\n3. Invoking with Arithmetic Expressions as Arguments:");
        computeTotalFee("Abhronila", (3000.0 + 1500.0), (2 * 3), (duration >= 4));

        // 4. Passing Widening Type Conversion (int literal 4000 passed to double parameter):
        System.out.println("\n4. Invoking with Automatic Type Widening (int to double):");
        int integerFee = 6000;
        computeTotalFee("Debangshu", integerFee, 3, true); // integerFee widened to double 6000.0!

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Formal Parameters are placeholders defined in the method signature.");
        System.out.println("2. Actual Arguments are real values/expressions supplied at the call site.");
        System.out.println("3. Arguments are evaluated left-to-right before the method stack frame is entered.");
        System.out.println("4. Java allows widening conversions (e.g. passing int to double parameter).");
        System.out.println("================================================================================");
    }
}
