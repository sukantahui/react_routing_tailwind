/**
 * File: ImplicitCastingCompoundAssignmentDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 14)
 * Description: Demonstrates implicit narrowing type casting in Java compound assignments (JLS §15.26.2),
 *              comparison with explicit standard assignment errors (b = b + 2 vs b += 2),
 *              silent integer overflow/wrap-around hazards (byte 127 += 1 -> -128),
 *              floating-point truncation (int += double), and student attendance auditing in Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ImplicitCastingCompoundAssignmentDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 14 IMPLICIT CASTING IN COMPOUND ASSIGNMENTS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. The Compilation Paradox: 'b = b + 2' (Error) vs 'b += 2' (Compiles!)
        System.out.println("--- 1. THE COMPILATION PARADOX (BYTE / SHORT ARITHMETIC) ---");
        byte b = 5;

        // b = b + 2; // COMPILATION ERROR! 'b + 2' promotes to int, cannot assign int to byte!
        // But compound assignment compiles cleanly:
        b += 2; // Automatically desugared to: b = (byte)(b + 2)
        System.out.printf("byte b = 5; b += 2 -> Result: %d (Compiles via implicit (byte) cast)%n%n", b);

        // 2. Silent Byte Wrap-Around / Overflow Trap
        System.out.println("--- 2. SILENT OVERFLOW HAZARD (BYTE WRAP-AROUND) ---");
        byte maxByte = 127;
        System.out.printf("Initial maxByte value         : %d%n", maxByte);

        // Silent overflow: (byte)(127 + 1) = -128 without any compiler warning!
        maxByte += 1;
        System.out.printf("After maxByte += 1 (Silent Wrap): %d (OVERFLOWED to Byte.MIN_VALUE!)%n", maxByte);

        byte attendanceCount = 100;
        attendanceCount += 300; // (byte)(100 + 300) = (byte)(400) -> 400 - 256 = 144 -> 144 - 256 = -112
        System.out.printf("byte 100 += 300 (400 truncated) : %d (Corrupted to negative!)%n%n", attendanceCount);

        // 3. Silent Floating-Point Truncation Hazard (int += double)
        System.out.println("--- 3. SILENT FLOATING-POINT TRUNCATION (INT += DOUBLE) ---");
        int studentFee = 15000;
        double taxAmount = 2700.85; // Fractional rupee tax

        // studentFee += taxAmount is desugared to: studentFee = (int)(studentFee + taxAmount)
        studentFee += taxAmount; // (int)(15000 + 2700.85) = (int)(17700.85) = 17700 (0.85 truncated!)
        System.out.printf("int studentFee (15000) += 2700.85 : ₹%,d (0.85 Paisa SILENTLY TRUNCATED!)%n%n", studentFee);

        // 4. Short and Char Implicit Narrowing
        System.out.println("--- 4. SHORT & CHAR IMPLICIT NARROWING ---");
        short s = 32767;
        s += 1; // (short)(32767 + 1) = -32768 (Short.MIN_VALUE)
        System.out.printf("short 32767 += 1                 : %d (Overflowed to Short.MIN_VALUE)%n", s);

        char ch = 'A'; // Unicode 65
        ch += 5;       // (char)('A' + 5) = (char)(70) = 'F'
        System.out.printf("char 'A' += 5                     : '%c' (Unicode %d)%n%n", ch, (int) ch);

        // 5. Real-World Student Laboratory Session Tracker (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT LAB SESSION AUDIT ---");
        auditStudentLabSessions("Swadeep", (byte) 120, (byte) 10);  // Safe: 120 + 10 = 130 (Wait! 130 > 127 -> Truncated!)
        auditStudentLabSessions("Tuhina", (byte) 50, (byte) 20);    // Safe: 50 + 20 = 70
        auditStudentLabSessions("Abhronila", (byte) 90, (byte) 15); // Safe: 90 + 15 = 105

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'E1 op= E2' automatically injects an implicit narrowing cast: E1 = (T)(E1 op E2).");
        System.out.println("2. While convenient, compound assignment SILENTLY hides overflow and precision loss!");
        System.out.println("3. 'int += double' silently drops the fractional decimal part without error.");
        System.out.println("4. Always choose appropriately sized types (int or long) to prevent silent wrap-around.");
        System.out.println("================================================================================");
    }

    private static void auditStudentLabSessions(String name, byte currentSessions, byte newSessions) {
        // HAZARD CHECK: Does current + new exceed Byte.MAX_VALUE (127)?
        int projectedTotal = currentSessions + newSessions;
        byte updatedSessions = currentSessions;
        updatedSessions += newSessions; // Implicit cast to byte!

        if (projectedTotal > Byte.MAX_VALUE) {
            System.out.printf("Student: %-10s | Projected: %d | Updated: %d [⚠️ SILENT OVERFLOW BUG DETECTED!]%n",
                    name, projectedTotal, updatedSessions);
        } else {
            System.out.printf("Student: %-10s | Total Lab Sessions: %d (Safe)%n", name, updatedSessions);
        }
    }
}
