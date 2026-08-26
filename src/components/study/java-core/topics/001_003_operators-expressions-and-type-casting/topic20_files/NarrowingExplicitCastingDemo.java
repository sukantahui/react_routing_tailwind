/**
 * File: NarrowingExplicitCastingDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 20)
 * Description: Demonstrates Java Narrowing / Explicit Casting (JLS §5.1.3),
 *              the 22 narrowing conversion pathways with explicit cast syntax (type),
 *              high-order bit truncation & two's complement sign-flip wrap-around,
 *              floating-point decimal truncation (double -> int), special float values (NaN -> 0, Infinity -> MAX_VALUE),
 *              and financial voucher downcasting in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class NarrowingExplicitCastingDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 20 NARROWING / EXPLICIT CASTING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Explicit Cast Syntax & Higher-Order Bit Truncation (int -> byte)
        System.out.println("--- 1. HIGH-ORDER BIT TRUNCATION (INT -> BYTE) ---");
        int normalVal = 100;
        byte normalByte = (byte) normalVal; // Safe: 100 fits in byte [-128, 127]
        System.out.printf("int 100  -> (byte)100  : %d (Safe - within range)%n", normalByte);

        int overflowVal = 130;
        // In binary, 130 is 00000000 00000000 00000000 10000010.
        // Discarding the upper 24 bits leaves 10000010, which in signed 8-bit byte is -126!
        byte overflowByte = (byte) overflowVal;
        System.out.printf("int 130  -> (byte)130  : %d (Sign bit flipped to negative!)%n", overflowByte);

        int largeVal = 257; // 256 + 1 -> 0x00000101 -> Lowest byte is 0x01 = 1
        byte largeByte = (byte) largeVal;
        System.out.printf("int 257  -> (byte)257  : %d (Upper 24 bits discarded!)%n", largeByte);

        int hugeVal = 1000;
        byte hugeByte = (byte) hugeVal;
        System.out.printf("int 1000 -> (byte)1000 : %d (1000 %% 256 = 232 -> 232 - 256 = -24)%n%n", hugeByte);

        // 2. Floating-Point to Integer Truncation (double -> int)
        System.out.println("--- 2. FLOATING-POINT DECIMAL TRUNCATION (DOUBLE -> INT) ---");
        double price = 99.99;
        int truncatedPrice = (int) price; // Truncates towards zero, NOT rounded!
        System.out.printf("double 99.99  -> (int)price : %d (0.99 truncated towards zero)%n", truncatedPrice);

        double negPrice = -99.99;
        int truncatedNegPrice = (int) negPrice;
        System.out.printf("double -99.99 -> (int)price : %d (Truncated towards zero)%n%n", truncatedNegPrice);

        // 3. Special IEEE 754 Floating-Point Values Narrowing (NaN & Infinity)
        System.out.println("--- 3. SPECIAL FLOATING-POINT CASTING (NAN & INFINITY) ---");
        double nanVal = Double.NaN;
        double posInf = Double.POSITIVE_INFINITY;
        double negInf = Double.NEGATIVE_INFINITY;

        int nanToInt = (int) nanVal; // NaN becomes 0
        int posInfToInt = (int) posInf; // +Infinity becomes Integer.MAX_VALUE
        int negInfToInt = (int) negInf; // -Infinity becomes Integer.MIN_VALUE

        System.out.printf("Double.NaN               -> (int) : %d%n", nanToInt);
        System.out.printf("Double.POSITIVE_INFINITY -> (int) : %,d (Integer.MAX_VALUE)%n", posInfToInt);
        System.out.printf("Double.NEGATIVE_INFINITY -> (int) : %,d (Integer.MIN_VALUE)%n%n", negInfToInt);

        // 4. Safe Narrowing with Boundary Checks (Defense Pattern)
        System.out.println("--- 4. DEFENSIVE BOUNDARY VALIDATION BEFORE NARROWING ---");
        safeCastToShort("Swadeep", 15000);   // Within short range [-32768, 32767]
        safeCastToShort("Tuhina", 50000);    // Exceeds short range!

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Narrowing casting requires explicit syntax: (targetType) expression.");
        System.out.println("2. Integer narrowing discards higher-order bits, causing silent wrap-around.");
        System.out.println("3. Floating-point to integer casting truncates decimals towards zero (99.99 -> 99).");
        System.out.println("4. Always validate numerical boundaries before performing explicit narrowing casts.");
        System.out.println("================================================================================");
    }

    private static void safeCastToShort(String studentName, int tuitionAmount) {
        if (tuitionAmount >= Short.MIN_VALUE && tuitionAmount <= Short.MAX_VALUE) {
            short shortVoucher = (short) tuitionAmount;
            System.out.printf("Student: %-10s | Amount: ₹%,d -> Safe short voucher: ₹%,d%n",
                    studentName, tuitionAmount, shortVoucher);
        } else {
            System.out.printf("Student: %-10s | Amount: ₹%,d -> [⚠️ BLOCKED: Exceeds Short max capacity (32,767)!]%n",
                    studentName, tuitionAmount);
        }
    }
}
