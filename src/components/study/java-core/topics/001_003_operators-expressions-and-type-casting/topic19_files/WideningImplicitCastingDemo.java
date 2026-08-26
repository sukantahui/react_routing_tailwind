/**
 * File: WideningImplicitCastingDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 19)
 * Description: Demonstrates Java Widening / Implicit Casting (JLS §5.1.2),
 *              the 19 widening conversion paths without explicit cast syntax,
 *              the critical precision loss nuance (int/long to float/double mantissa limits),
 *              and student financial ledger widening in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class WideningImplicitCastingDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 19 WIDENING / IMPLICIT CASTING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. The Seamless Widening Ladder (No Explicit Cast Required)
        System.out.println("--- 1. THE SEAMLESS WIDENING LADDER ---");
        byte byteVal = 100;
        short shortVal = byteVal;   // byte -> short (16 bits)
        int intVal = shortVal;      // short -> int (32 bits)
        long longVal = intVal;      // int -> long (64 bits)
        float floatVal = longVal;   // long -> float (32-bit IEEE 754)
        double doubleVal = floatVal;// float -> double (64-bit IEEE 754)

        System.out.printf("byte   : %d%n", byteVal);
        System.out.printf("short  : %d (Widened from byte)%n", shortVal);
        System.out.printf("int    : %d (Widened from short)%n", intVal);
        System.out.printf("long   : %d (Widened from int)%n", longVal);
        System.out.printf("float  : %.2f (Widened from long)%n", floatVal);
        System.out.printf("double : %.2f (Widened from float)%n%n", doubleVal);

        // 2. Character Widening to Int/Long/Float/Double
        System.out.println("--- 2. CHARACTER WIDENING ---");
        char charVal = 'A'; // Unicode 65
        int charToInt = charVal;
        long charToLong = charVal;
        double charToDouble = charVal;

        System.out.printf("char 'A' -> Widened to int   : %d%n", charToInt);
        System.out.printf("char 'A' -> Widened to long  : %d%n", charToLong);
        System.out.printf("char 'A' -> Widened to double: %.1f%n%n", charToDouble);

        // 3. The Precision Loss Nuance in Widening (int/long -> float/double)
        System.out.println("--- 3. PRECISION LOSS NUANCE (INT/LONG -> FLOAT/DOUBLE) ---");
        // An int has 32 bits of precision; a float only has a 23-bit mantissa!
        int largeInt = 123456789;
        float widenedFloat = largeInt; // Widening conversion happens seamlessly without error
        int backToInt = (int) widenedFloat;

        System.out.printf("Original int value           : %d%n", largeInt);
        System.out.printf("Widened to float (IEEE 754)  : %f%n", widenedFloat);
        System.out.printf("Cast back to int             : %d [⚠️ LEAST SIGNIFICANT DIGITS LOST!]%n%n", backToInt);

        // Long to Double precision loss (64-bit long vs 52-bit double mantissa):
        long largeLong = 9007199254740993L; // Exceeds 2^53 (53-bit mantissa)
        double widenedDouble = largeLong;
        long backToLong = (long) widenedDouble;

        System.out.printf("Original long value          : %d%n", largeLong);
        System.out.printf("Widened to double            : %.0f%n", widenedDouble);
        System.out.printf("Cast back to long            : %d [⚠️ ROUNDING ARTIFACT DETECTED!]%n%n", backToLong);

        // 4. Real-World Student Tuition Ledger (Barrackpore Center)
        System.out.println("--- 4. BARRACKPORE STUDENT TUITION WIDENING AUDIT ---");
        recordStudentFee("Swadeep", (short) 15000);
        recordStudentFee("Tuhina", (short) 22000);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Widening conversions (byte -> short -> int -> long -> float -> double) are automatic.");
        System.out.println("2. Widening between integer types never loses magnitude or numerical precision.");
        System.out.println("3. Widening large int/long to float/double may lose least significant bits due to mantissa limits.");
        System.out.println("4. Widening requires zero cast syntax, making code clean and secure.");
        System.out.println("================================================================================");
    }

    private static void recordStudentFee(String name, short feeShort) {
        // short is automatically widened to double in the accounting ledger:
        double feeInRupees = feeShort;
        double taxGst = feeInRupees * 0.18;
        double totalPayable = feeInRupees + taxGst;

        System.out.printf("Student: %-10s | Base (short): ₹%,d -> Ledger (double): ₹%,.2f | Total with GST: ₹%,.2f%n",
                name, feeShort, feeInRupees, totalPayable);
    }
}
