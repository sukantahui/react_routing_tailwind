/**
 * File: AutomaticTypePromotionDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 18)
 * Description: Demonstrates Java Automatic Type Promotion rules in expressions (JLS §5.6.1 & §5.6.2),
 *              Unary Numeric Promotion, Binary Numeric Promotion hierarchy (byte/short/char -> int -> long -> float -> double),
 *              the 'byte + byte' compilation trap, mixed arithmetic type resolution,
 *              and student examination average calculations in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class AutomaticTypePromotionDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 18 AUTOMATIC TYPE PROMOTION RULES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. The Classic Byte/Short/Char Promotion Trap
        System.out.println("--- 1. BYTE, SHORT & CHAR PROMOTED TO INT (JLS §5.6.2) ---");
        byte b1 = 10;
        byte b2 = 20;

        // byte b3 = b1 + b2; // COMPILATION ERROR! 'b1 + b2' evaluates to 32-bit int!
        int sumInt = b1 + b2;            // Clean compilation to int
        byte sumByte = (byte) (b1 + b2); // Requires explicit narrowing cast
        System.out.printf("byte b1 = 10, b2 = 20 -> (b1 + b2) promotes to int: %d%n", sumInt);
        System.out.printf("Explicit narrowing cast '(byte)(b1 + b2)'           : %d%n%n", sumByte);

        // 2. Character Arithmetic Promotion
        System.out.println("--- 2. CHARACTER ARITHMETIC PROMOTION ---");
        char c1 = 'A'; // Unicode 65
        char c2 = 'B'; // Unicode 66

        // char c3 = c1 + c2; // COMPILATION ERROR! 'c1 + c2' evaluates to int 131
        int charSum = c1 + c2;
        System.out.printf("char 'A' (65) + 'B' (66) -> Evaluates to int: %d%n", charSum);
        System.out.printf("char 'A' + 1             -> (char)('A' + 1)  : '%c'%n%n", (char) (c1 + 1));

        // 3. Binary Numeric Promotion Hierarchy: double > float > long > int
        System.out.println("--- 3. BINARY NUMERIC PROMOTION HIERARCHY ---");
        int intVal = 100;
        long longVal = 500L;
        float floatVal = 25.5f;
        double doubleVal = 10.25;

        // int + long -> promoted to long:
        long resLong = intVal + longVal;
        System.out.printf("int (100) + long (500L)       -> Type: long   | Value: %d%n", resLong);

        // long + float -> promoted to float:
        float resFloat = longVal + floatVal;
        System.out.printf("long (500L) + float (25.5f)   -> Type: float  | Value: %.1f%n", resFloat);

        // float + double -> promoted to double:
        double resDouble = floatVal + doubleVal;
        System.out.printf("float (25.5f) + double (10.25)-> Type: double | Value: %.2f%n%n", resDouble);

        // 4. Complex Mixed Expression Promotion
        System.out.println("--- 4. COMPLEX MIXED-TYPE ARITHMETIC RESOLUTION ---");
        byte b = 42;
        char c = 'a'; // 97
        short s = 1024;
        int i = 50000;
        float f = 5.67f;
        double d = .1234;

        // Expression breakdown:
        // (f * b)       -> float (5.67f * 42 = 238.14f)
        // (i / c)       -> int   (50000 / 97 = 515)
        // (d * s)       -> double(0.1234 * 1024 = 126.3616)
        // (float + int) -> float (753.14f)
        // (float - double) -> DOUBLE (626.7784)
        double totalResult = (f * b) + (i / c) - (d * s);

        System.out.printf("(f * b) [float] + (i / c) [int] - (d * s) [double] = %.4f%n%n", totalResult);

        // 5. Real-World Student Marks & Tuition Ledger (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT TUITION & MARKS AUDITOR ---");
        auditStudentAverages("Swadeep", (byte) 85, (byte) 90, (byte) 95, 15000L, 0.18);
        auditStudentAverages("Tuhina", (byte) 78, (byte) 82, (byte) 88, 22000L, 0.18);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Any arithmetic on byte, short, or char is AUTOMATICALLY promoted to 32-bit int.");
        System.out.println("2. Binary Promotion Hierarchy: double > float > long > int.");
        System.out.println("3. 'byte + byte' results in int, requiring '(byte)' cast if stored in byte.");
        System.out.println("4. Mixed expressions unify to the widest operand type (e.g. float + double -> double).");
        System.out.println("================================================================================");
    }

    private static void auditStudentAverages(String name, byte m1, byte m2, byte m3, long tuitionBase, double gstRate) {
        // (m1 + m2 + m3) is promoted to int, divided by 3.0 (double) -> result is double:
        double academicAverage = (m1 + m2 + m3) / 3.0;

        // tuitionBase (long) * gstRate (double) -> promoted to double:
        double totalTuitionWithGst = tuitionBase + (tuitionBase * gstRate);

        System.out.printf("Student: %-10s | Exam Average: %5.2f%% | Base: ₹%,d | Total with GST: ₹%,.2f%n",
                name, academicAverage, tuitionBase, totalTuitionWithGst);
    }
}
