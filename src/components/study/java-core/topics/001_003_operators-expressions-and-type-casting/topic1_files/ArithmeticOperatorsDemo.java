/**
 * File: ArithmeticOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 1)
 * Description: Demonstrates Java arithmetic operators (+, -, *, /, %),
 *              integer division truncation, floating-point division, modulus rules with negative numbers,
 *              floating-point modulus, division by zero behavior (ArithmeticException vs Infinity),
 *              and Indian Rupee (₹) cash denomination breakdowns.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ArithmeticOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 ARITHMETIC OPERATORS (+, -, *, /, %)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Basic Arithmetic Operations
        System.out.println("--- 1. BASIC ARITHMETIC OPERATORS ---");
        int a = 20;
        int b = 6;

        System.out.printf("Operands: a = %d, b = %d%n", a, b);
        System.out.printf("Addition (a + b)       : %d%n", (a + b));
        System.out.printf("Subtraction (a - b)    : %d%n", (a - b));
        System.out.printf("Multiplication (a * b) : %d%n", (a * b));
        System.out.printf("Integer Division (a / b): %d (Truncated quotient)%n", (a / b));
        System.out.printf("Modulus Remainder (a %% b): %d%n%n", (a % b));

        // 2. Modulus Sign Rules (Sign Follows the Dividend / Left Operand)
        System.out.println("--- 2. MODULUS SIGN RULES (DIVIDEND SIGN RULE) ---");
        // Formula: a % b = a - (a / b) * b
        System.out.printf(" 10 %%  3 =  %d (Dividend +10 -> Result is positive)%n", (10 % 3));
        System.out.printf("-10 %%  3 = %d (Dividend -10 -> Result is negative)%n", (-10 % 3));
        System.out.printf(" 10 %% -3 =  %d (Dividend +10 -> Divisor sign ignored)%n", (10 % -3));
        System.out.printf("-10 %% -3 = %d (Dividend -10 -> Result is negative)%n%n", (-10 % -3));

        // 3. Floating-Point Modulus (Supported Natively in Java)
        System.out.println("--- 3. FLOATING-POINT MODULUS IN JAVA ---");
        double floatDividend = 7.5;
        double floatDivisor = 2.0;
        double floatRemainder = floatDividend % floatDivisor; // 7.5 - (3 * 2.0) = 1.5

        System.out.printf("%.1f %% %.1f = %.1f (Native double modulus)%n%n",
                floatDividend, floatDivisor, floatRemainder);

        // 4. Division by Zero: Integer vs Floating-Point
        System.out.println("--- 4. DIVISION BY ZERO: INTEGER VS FLOATING POINT ---");
        // Integer division by zero throws ArithmeticException:
        try {
            int zeroDivide = a / 0;
        } catch (ArithmeticException e) {
            System.out.println("✓ Caught Integer Division by Zero: " + e.getMessage());
        }

        // Floating-point division by zero produces Infinity / NaN:
        double posInfinity = 20.0 / 0.0;
        double negInfinity = -20.0 / 0.0;
        double notANumber = 0.0 / 0.0;

        System.out.printf("20.0 / 0.0  = %f (Double.POSITIVE_INFINITY)%n", posInfinity);
        System.out.printf("-20.0 / 0.0 = %f (Double.NEGATIVE_INFINITY)%n", negInfinity);
        System.out.printf("0.0 / 0.0   = %f (Double.NaN)%n%n", notANumber);

        // 5. Real-World Currency Denomination Breakdown (Barrackpore Fee Counter)
        System.out.println("--- 5. BARRACKPORE FEE COUNTER: CASH DENOMINATION BREAKDOWN ---");
        breakdownCurrency(18765); // Total tuition fee collected in Indian Rupees (₹)

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Integer division (a / b) truncates decimals towards zero.");
        System.out.println("2. In modulus (a % b), the result sign ALWAYS matches the dividend 'a'.");
        System.out.println("3. Java supports floating-point modulus natively (e.g. 7.5 % 2.0 = 1.5).");
        System.out.println("4. Integer / 0 throws ArithmeticException; Floating / 0.0 yields Infinity.");
        System.out.println("================================================================================");
    }

    private static void breakdownCurrency(int totalAmount) {
        System.out.printf("Total Fee Amount to Disburse: ₹%,d%n", totalAmount);
        int[] denominations = {500, 200, 100, 50, 20, 10, 5, 2, 1};
        int remaining = totalAmount;

        for (int note : denominations) {
            int count = remaining / note; // Division gives count of notes
            remaining = remaining % note; // Modulus gives remaining balance

            if (count > 0) {
                System.out.printf(" -> ₹%-3d Notes : %2d (Subtotal: ₹%,d)%n", note, count, (count * note));
            }
        }
    }
}
