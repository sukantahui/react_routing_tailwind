/**
 * File: FloatingPointPrecisionDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 9)
 * Description: Demonstrates Java floating-point literals, float (F suffix) vs double (default),
 *              IEEE 754 binary representation, precision limits, rounding discrepancies,
 *              special values (Infinity, NaN), and financial calculations in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class FloatingPointPrecisionDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 FLOATING-POINT LITERALS & IEEE 754 PRECISION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Literal Declaration and Suffix Requirement
        System.out.println("--- 1. FLOAT VS DOUBLE LITERAL DECLARATIONS ---");
        // In Java, floating-point literals with a decimal point default to 'double' (64-bit).
        // float f1 = 3.14159; // COMPILER ERROR: Type mismatch: cannot convert from double to float!
        float radius = 7.5f;               // Explicit 'f' or 'F' suffix required
        float piApprox = 3.1415926535F;    // Truncated to 32-bit single precision (~6-7 significant digits)
        double precisePi = 3.14159265358979323846; // 64-bit double precision (~15-17 significant digits)

        System.out.printf("Float radius       : %.2f%n", radius);
        System.out.printf("Float Pi (32-bit)  : %.10f (Notice precision loss after 7th digit)%n", piApprox);
        System.out.printf("Double Pi (64-bit) : %.18f (High precision 64-bit IEEE 754)%n%n", precisePi);

        // 2. Scientific / Exponential Notation
        System.out.println("--- 2. SCIENTIFIC EXPONENTIAL NOTATION ---");
        double solarMassKg = 1.989e30;         // 1.989 * 10^30
        double electronCharge = 1.60217663e-19; // 1.60217663 * 10^-19
        float smallFee = 5.25e2f;               // 5.25 * 10^2 = 525.0

        System.out.printf("Solar Mass (kg)    : %e%n", solarMassKg);
        System.out.printf("Electron Charge (C): %e%n", electronCharge);
        System.out.printf("Scientific Fee (₹) : %.2f%n%n", smallFee);

        // 3. The Classic Binary Floating-Point Pitfall (0.1 + 0.2 != 0.3)
        System.out.println("--- 3. IEEE 754 BINARY FRACTION ROUNDING PITFALL ---");
        double a = 0.1;
        double b = 0.2;
        double sum = a + b;

        System.out.printf("a = %.1f, b = %.1f%n", a, b);
        System.out.printf("Actual sum (a + b)  : %.17f%n", sum);
        System.out.printf("Does (0.1 + 0.2 == 0.3)? %b%n", (sum == 0.3));
        System.out.println("Explanation: Numbers like 0.1 cannot be represented exactly in binary powers of 2 (1/2, 1/4, 1/8, ...).\n");

        // 4. Classroom Financial Scenario: Barrackpore Student Fee Ledger
        System.out.println("--- 4. CLASSROOM FINANCIAL LEDGER (FLOAT vs BIGDECIMAL) ---");
        // Swadeep in Barrackpore is auditing student fee installments:
        double feePart1 = 12500.10;
        double feePart2 = 8750.20;
        double totalFloat = feePart1 + feePart2;

        System.out.printf("Double Arithmetic Result : ₹%.17f%n", totalFloat);

        // Professional Solution for Monetary Transactions: BigDecimal
        BigDecimal exactFee1 = new BigDecimal("12500.10");
        BigDecimal exactFee2 = new BigDecimal("8750.20");
        BigDecimal exactTotal = exactFee1.add(exactFee2);

        System.out.printf("BigDecimal Exact Result  : ₹%s (Exact Indian Rupee Settlement)%n%n", exactTotal.setScale(2, RoundingMode.HALF_UP));

        // 5. IEEE 754 Special Floating-Point Values
        System.out.println("--- 5. SPECIAL VALUES: INFINITY AND NaN ---");
        // Unlike integer division by zero which throws ArithmeticException, floating-point division produces special IEEE 754 values:
        double positiveInf = 100.0 / 0.0;
        double negativeInf = -100.0 / 0.0;
        double notANumber = 0.0 / 0.0;
        double sqrtNegative = Math.sqrt(-9.0);

        System.out.printf("100.0 / 0.0        : %s (Double.isInfinite: %b)%n", positiveInf, Double.isInfinite(positiveInf));
        System.out.printf("-100.0 / 0.0       : %s%n", negativeInf);
        System.out.printf("0.0 / 0.0          : %s (Double.isNaN: %b)%n", notANumber, Double.isNaN(notANumber));
        System.out.printf("Math.sqrt(-9.0)    : %s%n", sqrtNegative);
        System.out.printf("NaN == NaN check   : %b (NaN is never equal to anything, even itself!)%n%n", (notANumber == notANumber));

        // 6. Summary Checklist
        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Float is 32-bit (4 bytes, ~7 digits precision), double is 64-bit (8 bytes, ~15 digits).");
        System.out.println("2. Literal 3.14 is a double by default; 3.14f is a float.");
        System.out.println("3. NEVER use float or double for money (Rupees, accounting, crypto). Use BigDecimal!");
        System.out.println("4. Double division by zero produces Infinity or NaN without crashing.");
        System.out.println("================================================================================");
    }
}
