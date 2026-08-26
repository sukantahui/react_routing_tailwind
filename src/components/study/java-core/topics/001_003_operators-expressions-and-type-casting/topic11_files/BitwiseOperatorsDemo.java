/**
 * File: BitwiseOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 11)
 * Description: Demonstrates Java bitwise operators: Bitwise AND (&), Bitwise OR (|),
 *              Bitwise XOR (^), and Bitwise Inversion (~), bitmask flag management (Set, Check, Toggle, Clear),
 *              XOR variable swapping, finding single non-duplicate elements,
 *              and student security permissions at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class BitwiseOperatorsDemo {

    // Permission Bitmasks (Powers of 2):
    public static final int PERMISSION_VIEW_COURSES = 0b00000001; // Bit 0 (1)
    public static final int PERMISSION_ATTEND_LAB   = 0b00000010; // Bit 1 (2)
    public static final int PERMISSION_DOWNLOAD_PDF = 0b00000100; // Bit 2 (4)
    public static final int PERMISSION_ADMIN_ACCESS = 0b00001000; // Bit 3 (8)

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 BITWISE OPERATORS (&, |, ^, ~)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Bitwise Truth Tables & Bit-Level Computation
        System.out.println("--- 1. BITWISE FUNDAMENTALS ON INTEGERS ---");
        int a = 12; // 00001100 in binary
        int b = 10; // 00001010 in binary

        int andResult = a & b; // 00001000 (8)
        int orResult  = a | b; // 00001110 (14)
        int xorResult = a ^ b; // 00000110 (6)
        int notResult = ~a;    // 11110011 (-13 via -(12 + 1))

        System.out.printf("Operand a = %2d (%s)%n", a, to8BitBinary(a));
        System.out.printf("Operand b = %2d (%s)%n", b, to8BitBinary(b));
        System.out.printf("a & b     = %2d (%s) -> Bitwise AND%n", andResult, to8BitBinary(andResult));
        System.out.printf("a | b     = %2d (%s) -> Bitwise OR%n", orResult, to8BitBinary(orResult));
        System.out.printf("a ^ b     = %2d (%s) -> Bitwise XOR%n", xorResult, to8BitBinary(xorResult));
        System.out.printf("~a        = %2d (%s) -> Bitwise NOT%n%n", notResult, to8BitBinary(notResult));

        // 2. The 4 Essential Bitmask Operations: Set, Check, Toggle, Clear
        System.out.println("--- 2. THE 4 ESSENTIAL BITMASK OPERATIONS (STUDENT PERMISSIONS) ---");
        int studentFlags = 0; // No permissions initially (00000000)

        // Operation 1: SET Flag (Bitwise OR '|')
        studentFlags = studentFlags | PERMISSION_VIEW_COURSES | PERMISSION_ATTEND_LAB;
        System.out.printf("1. SET Permissions (View + Lab)   : %s (Flags: %d)%n", to8BitBinary(studentFlags), studentFlags);

        // Operation 2: CHECK Flag (Bitwise AND '&')
        boolean canAttendLab = (studentFlags & PERMISSION_ATTEND_LAB) != 0;
        boolean isAdmin = (studentFlags & PERMISSION_ADMIN_ACCESS) != 0;
        System.out.printf("2. CHECK: Can Attend Lab? %-5b | Is Admin? %-5b%n", canAttendLab, isAdmin);

        // Operation 3: TOGGLE Flag (Bitwise XOR '^')
        studentFlags = studentFlags ^ PERMISSION_DOWNLOAD_PDF; // Turn PDF download ON
        System.out.printf("3. TOGGLE PDF Download (ON)       : %s%n", to8BitBinary(studentFlags));
        studentFlags = studentFlags ^ PERMISSION_DOWNLOAD_PDF; // Turn PDF download OFF
        System.out.printf("   TOGGLE PDF Download (OFF)      : %s%n", to8BitBinary(studentFlags));

        // Operation 4: CLEAR Flag (Bitwise AND with NOT '& ~')
        studentFlags = studentFlags & ~PERMISSION_ATTEND_LAB; // Revoke Lab access
        System.out.printf("4. CLEAR Lab Permission (& ~MASK) : %s%n%n", to8BitBinary(studentFlags));

        // 3. In-Place XOR Variable Swapping (Without Temporary Variable)
        System.out.println("--- 3. IN-PLACE XOR VARIABLE SWAP ---");
        int feeScholarship = 15000;
        int feeGeneral = 22000;

        System.out.printf("Before Swap: FeeA = ₹%,d, FeeB = ₹%,d%n", feeScholarship, feeGeneral);
        // Swap arithmetic using XOR:
        feeScholarship = feeScholarship ^ feeGeneral;
        feeGeneral     = feeScholarship ^ feeGeneral;
        feeScholarship = feeScholarship ^ feeGeneral;
        System.out.printf("After Swap : FeeA = ₹%,d, FeeB = ₹%,d%n%n", feeScholarship, feeGeneral);

        // 4. Algorithmic XOR: Finding the Single Non-Duplicate Student ID
        System.out.println("--- 4. ALGORITHMIC XOR: FIND SINGLE UNIQUE ROLL NUMBER ---");
        // Every roll number appears twice except for the unique student:
        int[] studentRolls = {101, 102, 103, 104, 102, 101, 103};
        int uniqueRoll = 0;
        for (int roll : studentRolls) {
            uniqueRoll ^= roll; // Duplicate numbers cancel out (x ^ x = 0), leaving the unique element!
        }
        System.out.printf("Array of Student Rolls: [101, 102, 103, 104, 102, 101, 103]%n");
        System.out.printf("Unique Unpaired Student Roll Identified via XOR: #%d%n%n", uniqueRoll);

        // 5. Real-World Student Access Audit (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT PERMISSION AUDIT ---");
        auditPermissions("Swadeep", PERMISSION_VIEW_COURSES | PERMISSION_ATTEND_LAB | PERMISSION_DOWNLOAD_PDF);
        auditPermissions("Tuhina", PERMISSION_VIEW_COURSES | PERMISSION_ATTEND_LAB | PERMISSION_DOWNLOAD_PDF | PERMISSION_ADMIN_ACCESS);
        auditPermissions("Abhronila", PERMISSION_VIEW_COURSES);
        auditPermissions("Debangshu", PERMISSION_VIEW_COURSES | PERMISSION_ATTEND_LAB);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Bitwise operators manipulate individual binary bits of integral types.");
        System.out.println("2. SET with OR (|), CHECK with AND (&), TOGGLE with XOR (^), CLEAR with AND-NOT (& ~).");
        System.out.println("3. XOR properties: x ^ x = 0, x ^ 0 = x, enabling in-place swaps & non-duplicate searches.");
        System.out.println("4. Inversion formula: ~x = -(x + 1).");
        System.out.println("================================================================================");
    }

    private static void auditPermissions(String name, int mask) {
        boolean canView = (mask & PERMISSION_VIEW_COURSES) != 0;
        boolean canLab = (mask & PERMISSION_ATTEND_LAB) != 0;
        boolean canPdf = (mask & PERMISSION_DOWNLOAD_PDF) != 0;
        boolean isAdmin = (mask & PERMISSION_ADMIN_ACCESS) != 0;

        System.out.printf("Student: %-10s | Binary: %s | View: %-5b | Lab: %-5b | PDF: %-5b | Admin: %-5b%n",
                name, to8BitBinary(mask), canView, canLab, canPdf, isAdmin);
    }

    private static String to8BitBinary(int value) {
        return String.format("%8s", Integer.toBinaryString(value & 0xFF)).replace(' ', '0');
    }
}
