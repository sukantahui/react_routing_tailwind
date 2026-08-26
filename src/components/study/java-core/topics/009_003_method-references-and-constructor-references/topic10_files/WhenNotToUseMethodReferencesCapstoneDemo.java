/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 10: When NOT to Use Method References: Readability vs Over-Cleverness (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Function;

class ComplexTaxCalculation {
    public static double computeGstWithCustomCess(double amount, double rate, double cessRate) {
        return amount * (rate + cessRate) / 100.0;
    }
}

public class WhenNotToUseMethodReferencesCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: WHEN NOT TO USE METHOD REFERENCES (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 SCENARIOS WHERE EXPLICIT LAMBDAS ARE SUPERIOR TO METHOD REFERENCES:");
        System.out.println();

        // 1. SCENARIO 1: Parameter Transformations or Constant Injections:
        // Lambda is CLEAR and INTUITIVE:
        Function<Double, Double> standardTaxWith18Percent = amt -> ComplexTaxCalculation.computeGstWithCustomCess(amt, 18.0, 4.0);
        System.out.printf(">>> 1. Parameter Injection (Lambda is clean): ₹%,.2f%n", standardTaxWith18Percent.apply(50000.0));
        // You CANNOT use a method reference here because '18.0' and '4.0' are constants injected into the call!

        // 2. SCENARIO 2: Ambiguous Overloads:
        // If a class has 'doWork(int)' and 'doWork(Integer)', 'MyClass::doWork' causes ambiguity compiler errors.
        // Explicit lambda '(int x) -> doWork(x)' resolves ambiguity instantly.

        // 3. SCENARIO 3: Clearer Intent for Juniors / Readability:
        // 's -> s.length() == 0' is often more immediately obvious than 'String::isEmpty' to beginners in complex boolean expressions.

        System.out.println("\n>>> THE GOLDEN RULE (Joshua Bloch, Effective Java):");
        System.out.println("  - 'Where a method reference is shorter and clearer, use it; where it is NOT shorter and clearer, stick with a lambda!'");

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 009_003 METHOD & CONSTRUCTOR REFERENCES 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}