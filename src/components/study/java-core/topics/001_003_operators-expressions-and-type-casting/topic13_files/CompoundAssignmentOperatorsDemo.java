/**
 * File: CompoundAssignmentOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 13)
 * Description: Demonstrates all 11 Java compound assignment operators (+=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=, >>>=),
 *              the single-evaluation guarantee of the left-hand variable (JLS §15.26.2),
 *              Right-to-Left associativity, and student fee ledger accumulation in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class CompoundAssignmentOperatorsDemo {

    private static int methodCallCounter = 0;

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 13 COMPOUND ASSIGNMENT OPERATORS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Arithmetic Compound Assignments (+=, -=, *=, /=, %=)
        System.out.println("--- 1. ARITHMETIC COMPOUND ASSIGNMENTS ---");
        int balance = 10000;
        System.out.printf("Initial Balance        : ₹%,d%n", balance);

        balance += 5000; // balance = balance + 5000 -> 15000
        System.out.printf("After deposit (+= 5000): ₹%,d%n", balance);

        balance -= 2500; // balance = balance - 2500 -> 12500
        System.out.printf("After expense (-= 2500): ₹%,d%n", balance);

        balance *= 2;    // balance = balance * 2 -> 25000
        System.out.printf("After bonus   (*= 2)   : ₹%,d%n", balance);

        balance /= 5;    // balance = balance / 5 -> 5000
        System.out.printf("After split   (/= 5)   : ₹%,d%n", balance);

        balance %= 3000; // balance = balance % 3000 -> 2000
        System.out.printf("After modulus (%%= 3000): ₹%,d%n%n", balance);

        // 2. Bitwise & Shift Compound Assignments (&=, |=, ^=, <<=, >>=, >>>=)
        System.out.println("--- 2. BITWISE & SHIFT COMPOUND ASSIGNMENTS ---");
        int flags = 0b00000001; // 1

        flags |= 0b00000010; // SET bit 1 -> 0b00000011 (3)
        System.out.printf("flags |= 0b0010 -> %d (Binary: %s)%n", flags, to8BitBinary(flags));

        flags ^= 0b00000100; // TOGGLE bit 2 -> 0b00000111 (7)
        System.out.printf("flags ^= 0b0100 -> %d (Binary: %s)%n", flags, to8BitBinary(flags));

        flags &= 0b00000101; // MASK bits -> 0b00000101 (5)
        System.out.printf("flags &= 0b0101 -> %d (Binary: %s)%n", flags, to8BitBinary(flags));

        int shiftVal = 5;
        shiftVal <<= 2; // 5 * 4 = 20
        System.out.printf("shiftVal <<= 2  -> %d%n", shiftVal);

        shiftVal >>= 1; // 20 / 2 = 10
        System.out.printf("shiftVal >>= 1  -> %d%n", shiftVal);

        shiftVal >>>= 1; // 10 / 2 = 5
        System.out.printf("shiftVal >>>= 1 -> %d%n%n", shiftVal);

        // 3. The Single-Evaluation Guarantee of Left Operand (JLS §15.26.2)
        System.out.println("--- 3. SINGLE-EVALUATION GUARANTEE (JLS §15.26.2) ---");
        int[] feeArray = {15000, 22000, 18000};

        methodCallCounter = 0;
        // In feeArray[getIndex()] += 500: getIndex() is called EXACTLY ONCE!
        feeArray[getTargetIndex()] += 500;
        System.out.printf("Method invocation count with '+=' : %d (Called ONLY once!)%n", methodCallCounter);

        methodCallCounter = 0;
        // In standard feeArray[getIndex()] = feeArray[getIndex()] + 500: getIndex() is called TWICE!
        feeArray[getTargetIndex()] = feeArray[getTargetIndex()] + 500;
        System.out.printf("Method invocation count with '='  : %d (Called TWICE - wasteful/buggy!)%n%n", methodCallCounter);

        // 4. Right-to-Left Associativity of Compound Assignments
        System.out.println("--- 4. RIGHT-TO-LEFT ASSOCIATIVITY ---");
        int x = 10, y = 20, z = 30;
        // Evaluates as: x += (y += (z += 5))
        // z becomes 35 -> y becomes 55 -> x becomes 65
        x += y += z += 5;
        System.out.printf("Result of 'x += y += z += 5' -> x=%d, y=%d, z=%d%n%n", x, y, z);

        // 5. Real-World Student Fee Installment Accumulator (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT TUITION INSTALLMENT ACCUMULATOR ---");
        StudentFeeLedger ledgerSwadeep = new StudentFeeLedger("Swadeep", 15000.0);
        ledgerSwadeep.recordPayment(5000.0);
        ledgerSwadeep.recordPayment(5000.0);
        ledgerSwadeep.recordPayment(5000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Java provides 11 compound operators: +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=, >>>=");
        System.out.println("2. Compound assignments evaluate the left operand array/method index ONLY ONCE (JLS §15.26.2).");
        System.out.println("3. Compound assignment operators associate RIGHT-TO-LEFT (x += y += z).");
        System.out.println("4. They include an implicit narrowing cast: E1 = (T)(E1 op E2).");
        System.out.println("================================================================================");
    }

    private static int getTargetIndex() {
        methodCallCounter++;
        return 0; // Target index 0
    }

    private static class StudentFeeLedger {
        private final String studentName;
        private final double totalDue;
        private double totalPaid;

        public StudentFeeLedger(String studentName, double totalDue) {
            this.studentName = studentName;
            this.totalDue = totalDue;
            this.totalPaid = 0.0;
        }

        public void recordPayment(double installment) {
            this.totalPaid += installment; // Compound assignment accumulator
            double remaining = totalDue - totalPaid;
            System.out.printf("Student: %-10s | Paid Installment: ₹%,.2f | Total Paid: ₹%,.2f | Remaining: ₹%,.2f%n",
                    studentName, installment, totalPaid, remaining);
        }
    }

    private static String to8BitBinary(int value) {
        return String.format("%8s", Integer.toBinaryString(value & 0xFF)).replace(' ', '0');
    }
}
