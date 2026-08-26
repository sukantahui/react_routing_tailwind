/**
 * File: UnaryOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 5)
 * Description: Demonstrates Java unary operators: unary plus (+), unary minus (-),
 *              logical NOT (!), and bitwise NOT (~), unary numeric promotion (byte to int),
 *              the bitwise NOT formula (~x = -(x + 1)), Right-to-Left associativity,
 *              and account balance toggles in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class UnaryOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 5 UNARY OPERATORS (+, -, !, ~)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Unary Plus (+) and Unary Minus (-)
        System.out.println("--- 1. UNARY PLUS (+) AND UNARY MINUS (-) ---");
        int balance = 5000;
        int positiveVal = +balance; // Unary plus (indicates positive, promotes narrower types)
        int debtVal = -balance;     // Unary minus (negates value -> -5000)
        int negatedDebt = -debtVal; // Negating a negative returns positive -> +5000

        System.out.printf("Initial Balance  : ₹%,d%n", balance);
        System.out.printf("Unary Plus (+b)  : ₹%,d%n", positiveVal);
        System.out.printf("Unary Minus (-b) : ₹%,d (Debt)%n", debtVal);
        System.out.printf("Double Negation  : ₹%,d%n%n", negatedDebt);

        // 2. Unary Numeric Promotion (byte/short/char to int)
        System.out.println("--- 2. UNARY NUMERIC PROMOTION ---");
        byte smallByte = 42;
        // Unary '+' or '-' promotes byte to int!
        // byte badByte = -smallByte; // COMPILER ERROR: Type mismatch: cannot convert from int to byte
        int promotedInt = -smallByte;
        byte safeCastedByte = (byte) -smallByte;

        System.out.printf("Original byte: %d -> Promoted to int via unary minus: %d%n%n", smallByte, promotedInt);

        // 3. Logical NOT (!)
        System.out.println("--- 3. LOGICAL NOT (!) OPERATOR ---");
        boolean isEnrolled = true;
        boolean isBlocked = !isEnrolled; // Inverts true to false
        boolean isDoubleNegated = !!isEnrolled; // Inverts back to true

        System.out.printf("isEnrolled        : %b%n", isEnrolled);
        System.out.printf("!isEnrolled       : %b%n", isBlocked);
        System.out.printf("!!isEnrolled      : %b (Double negation)%n%n", isDoubleNegated);

        // 4. Bitwise NOT / Inversion (~) & The Formula (~x = -(x + 1))
        System.out.println("--- 4. BITWISE NOT (~) & THE FORMULA: ~x = -(x + 1) ---");
        int[] sampleValues = {0, 1, 5, 10, -1, -6, -10};

        for (int val : sampleValues) {
            int bitwiseNot = ~val;
            System.out.printf("Value: %3d | Inverted (~val): %3d | Binary: %32s -> %32s%n",
                    val, bitwiseNot,
                    String.format("%32s", Integer.toBinaryString(val)).replace(' ', '0'),
                    String.format("%32s", Integer.toBinaryString(bitwiseNot)).replace(' ', '0'));
        }

        // 5. Right-to-Left Associativity of Unary Operators
        System.out.println("\n--- 5. RIGHT-TO-LEFT ASSOCIATIVITY OF UNARY OPERATORS ---");
        int num = 10;
        int chainedMinus = - - -num; // Evaluated as -(-(-(10))) -> -10
        boolean chainedNot = ! ! !false; // Evaluated as !(!(!false)) -> !(!true) -> !(false) -> true

        System.out.printf("Chained - - - 10   : %d%n", chainedMinus);
        System.out.printf("Chained ! ! !false : %b%n%n", chainedNot);

        // 6. Real-World Student Financial Status Engine (Barrackpore Center)
        System.out.println("--- 6. BARRACKPORE STUDENT ACCOUNT STATUS AUDITOR ---");
        auditStudentAccount("Swadeep", 15000.0, true, 0b00000001);
        auditStudentAccount("Tuhina", -2500.0, false, 0b00000010);
        auditStudentAccount("Abhronila", 0.0, true, 0b00000100);
        auditStudentAccount("Debangshu", -5000.0, true, 0b00001000);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Unary operators act on a single operand and associate Right-to-Left.");
        System.out.println("2. Unary '+' and '-' promote byte/short/char to 32-bit int.");
        System.out.println("3. Logical NOT (!) inverts booleans; bitwise NOT (~) inverts all bits.");
        System.out.println("4. The fundamental Bitwise NOT formula: ~x = -(x + 1).");
        System.out.println("================================================================================");
    }

    private static void auditStudentAccount(String name, double balance, boolean hasValidID, int permissionMask) {
        boolean hasDues = balance < 0.0;
        double duesAmount = hasDues ? -balance : 0.0; // Unary minus to display positive debt in ₹
        boolean canAccessLab = hasValidID && !hasDues;
        int invertedMask = ~permissionMask;

        System.out.printf("Student: %-10s | Balance: %s₹%,.2f | Dues: ₹%,.2f | Lab Access: %-5b | Inverted Mask: %08X%n",
                name, (balance >= 0 ? "+" : ""), balance, duesAmount, canAccessLab, invertedMask);
    }
}
