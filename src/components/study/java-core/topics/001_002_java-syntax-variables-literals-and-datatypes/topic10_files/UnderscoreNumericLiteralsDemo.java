/**
 * File: UnderscoreNumericLiteralsDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 10)
 * Description: Demonstrates Java 7+ Underscores in Numeric Literals feature across
 *              decimal integers, longs, floating-point, binary, hexadecimal, and octal bases.
 *              Explains syntax rules, compiler stripping, and real-world Indian Rupee (₹) use cases.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

public class UnderscoreNumericLiteralsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 UNDERSCORES IN NUMERIC LITERALS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Large Decimal Integers and Currency (Indian Rupee Numbering System)
        System.out.println("--- 1. DECIMAL NUMERIC READABILITY (INDIAN RUPEES ₹) ---");
        // Without underscores: hard to count zeroes
        int unformattedFee = 1500000;
        // With underscores (Lakhs grouping: 15,00,000):
        int feeLakhs = 15_00_000;
        long stateBudgetCrores = 500_00_00_000L; // ₹500 Crores
        double monthlySalary = 85_500.75;        // ₹85,500.75

        System.out.printf("College Annual Revenue : ₹%,d%n", feeLakhs);
        System.out.printf("State Education Budget : ₹%,d%n", stateBudgetCrores);
        System.out.printf("Senior Faculty Salary  : ₹%,.2f%n%n", monthlySalary);

        // 2. Hardware IDs and Card Formats
        System.out.println("--- 2. IDENTIFICATION NUMBERS & CARD FORMATS ---");
        long debitCardNumber = 4123_4567_8901_2345L;
        long aadhaarNumber    = 9876_5432_1098L;
        long socialSecurity   = 999_99_9999L;

        System.out.printf("Debit Card (Masked)    : ****-****-****-%04d%n", (debitCardNumber % 10000));
        System.out.printf("Aadhaar Number (Raw)   : %d%n", aadhaarNumber);
        System.out.printf("SSN (Raw)              : %d%n%n", socialSecurity);

        // 3. Binary Literals with 4-bit Nibble and 8-bit Byte Grouping
        System.out.println("--- 3. BINARY LITERALS (0b) WITH NIBBLE / BYTE GROUPING ---");
        // 8-bit binary flags:
        byte networkFlags = (byte) 0b1010_0110;
        // 32-bit subnet mask (255.255.255.0):
        int subnetMask = 0b1111_1111_1111_1111_1111_1111_0000_0000;

        System.out.printf("Binary Network Flags   : 0x%02X (Decimal: %d)%n", networkFlags, networkFlags);
        System.out.printf("Subnet Mask Hex        : 0x%08X (Decimal: %d)%n%n", subnetMask, subnetMask);

        // 4. Hexadecimal Literals with Byte Groupings
        System.out.println("--- 4. HEXADECIMAL LITERALS (0x) WITH BYTE GROUPING ---");
        // RGBA Color Code (Red, Green, Blue, Alpha):
        int primaryBrandColor = 0xFF_57_33_FF; // Orange-Red with full Alpha
        long memoryPointerAddress = 0x7FFF_FFFF_ECE0L;

        System.out.printf("Brand Color (ARGB Hex) : #%08X%n", primaryBrandColor);
        System.out.printf("Memory Stack Pointer   : 0x%X%n%n", memoryPointerAddress);

        // 5. Floating-Point Literals with Underscores
        System.out.println("--- 5. FLOATING-POINT LITERALS ---");
        float piApproximation = 3.14_15_92_65f;
        double speedOfLightMps = 299_792_458.0; // Exact speed of light in vacuum (m/s)
        double plancksConstant = 6.626_070_15e-34; // 6.62607015 * 10^-34 J*s

        System.out.printf("Pi Approximation       : %.8f%n", piApproximation);
        System.out.printf("Speed of Light (m/s)   : %,.1f%n", speedOfLightMps);
        System.out.printf("Planck's Constant      : %e J*s%n%n", plancksConstant);

        // 6. Classroom Demonstration: Swadeep and Tuhina's Compilation Inspection
        System.out.println("--- 6. COMPILER STRIPPING DEMONSTRATION ---");
        int a = 1000000;
        int b = 1_000_000;
        int c = 10_00_000;
        int d = 1_0_0_0_0_0_0;

        System.out.printf("a (no underscores)     : %d%n", a);
        System.out.printf("b (thousands grouping) : %d%n", b);
        System.out.printf("c (Indian Lakhs)       : %d%n", c);
        System.out.printf("d (arbitrary placement): %d%n", d);
        System.out.printf("Are all values identical in bytecode? %b%n%n", (a == b && b == c && c == d));

        // 7. Invalid Syntax Reference Guide (Compilation Errors if uncommented):
        /*
        int invalid1 = _100;      // ERROR: _100 is an identifier (variable name), not a literal
        int invalid2 = 100_;      // ERROR: Underscore cannot appear at the end of a literal
        int invalid3 = 0_x52;     // ERROR: Cannot appear inside or next to '0x' prefix
        int invalid4 = 0x_52;     // ERROR: Cannot appear immediately after '0x'
        float invalid5 = 3._14f;  // ERROR: Cannot appear immediately before decimal point
        float invalid6 = 3_.14f;  // ERROR: Cannot appear immediately after decimal point
        long invalid7 = 999_L;    // ERROR: Cannot appear immediately before type suffix 'L'
        */

        System.out.println("================================================================================");
        System.out.println("SUMMARY FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Underscores can be placed anywhere BETWEEN digits.");
        System.out.println("2. Underscores are completely erased by 'javac' during compilation (zero bytecode cost).");
        System.out.println("3. Never place underscores at the start/end, adjacent to '.', or before 'L'/'f' suffixes.");
        System.out.println("================================================================================");
    }
}
