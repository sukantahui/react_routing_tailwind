/**
 * File: ShiftOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 12)
 * Description: Demonstrates Java shift operators: Left Shift (<<), Signed Right Shift (>>),
 *              and Unsigned Right Shift (>>>), shift distance masking (JLS §15.19),
 *              multiplication/division by powers of 2, 24-bit RGB color packing/unpacking,
 *              and financial ledger security masking at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ShiftOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 12 SHIFT OPERATORS (<<, >>, >>>)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Left Shift (<<) & Multiplication by Powers of 2
        System.out.println("--- 1. LEFT SHIFT (<<) [a * 2^s] ---");
        int num = 5; // 00000000 00000000 00000000 00000101 (5)
        int shifted1 = num << 1; // 5 * 2^1 = 10
        int shifted2 = num << 2; // 5 * 2^2 = 20
        int shifted3 = num << 3; // 5 * 2^3 = 40

        System.out.printf("Original num = %d (%s)%n", num, to32BitBinary(num));
        System.out.printf("5 << 1       = %d (%s) [5 * 2 = 10]%n", shifted1, to32BitBinary(shifted1));
        System.out.printf("5 << 2       = %d (%s) [5 * 4 = 20]%n", shifted2, to32BitBinary(shifted2));
        System.out.printf("5 << 3       = %d (%s) [5 * 8 = 40]%n%n", shifted3, to32BitBinary(shifted3));

        // 2. Signed Right Shift (>>) [Preserves Sign Bit / Floor Division by 2^s]
        System.out.println("--- 2. SIGNED RIGHT SHIFT (>>) [Sign Extension] ---");
        int posVal = 40;
        int negVal = -40;

        int posShifted = posVal >> 2; // 40 / 4 = 10 (Fills with 0s)
        int negShifted = negVal >> 2; // -40 / 4 = -10 (Fills with 1s to preserve negative sign!)

        System.out.printf("Positive +40 >> 2 = %2d (%s)%n", posShifted, to32BitBinary(posShifted));
        System.out.printf("Negative -40 >> 2 = %2d (%s)%n", negShifted, to32BitBinary(negShifted));
        System.out.printf("Negative  -1 >> 5 = %2d (%s) [Always remains -1]%n%n", (-1 >> 5), to32BitBinary(-1 >> 5));

        // 3. Unsigned Right Shift (>>>) [Zero Extension]
        System.out.println("--- 3. UNSIGNED RIGHT SHIFT (>>>) [Zero Extension] ---");
        int negOne = -1; // 11111111 11111111 11111111 11111111
        int signedShift   = negOne >> 1;  // Still -1 (11111111...)
        int unsignedShift = negOne >>> 1; // 01111111 11111111 11111111 11111111 (Integer.MAX_VALUE: 2147483647)

        System.out.printf("-1 in binary             : %s (%d)%n", to32BitBinary(negOne), negOne);
        System.out.printf("-1 >>  1 (Signed)        : %s (%d)%n", to32BitBinary(signedShift), signedShift);
        System.out.printf("-1 >>> 1 (Unsigned)      : %s (%d -> Integer.MAX_VALUE!)%n%n",
                to32BitBinary(unsignedShift), unsignedShift);

        // 4. Shift Distance Masking Rule (JLS §15.19)
        System.out.println("--- 4. SHIFT DISTANCE MASKING (JLS §15.19) ---");
        // For 32-bit int, shift distance is masked with 0x1F (distance % 32):
        int base = 8;
        int shift32 = base << 32; // 32 % 32 = 0 -> base << 0 = 8!
        int shift33 = base << 33; // 33 % 32 = 1 -> base << 1 = 16!

        System.out.printf("8 << 32 (32 %% 32 = 0)   : %d (Unchanged!)%n", shift32);
        System.out.printf("8 << 33 (33 %% 32 = 1)   : %d (Equivalent to 8 << 1)%n%n", shift33);

        // 5. Real-World ARGB Color Packing and Unpacking (Graphics / UI Engine)
        System.out.println("--- 5. ARGB COLOR PACKING & UNPACKING VIA SHIFTS ---");
        int alpha = 255; // Opacity (0xFF)
        int red   = 180; // Red component
        int green = 80;  // Green component
        int blue  = 220; // Blue component

        // Pack 4 separate 8-bit channels into a single 32-bit integer:
        int packedARGB = (alpha << 24) | (red << 16) | (green << 8) | blue;
        System.out.printf("Packed Color ARGB        : 0x%08X (%s)%n", packedARGB, to32BitBinary(packedARGB));

        // Unpack the channels using shifts and & 0xFF masks:
        int unpackedAlpha = (packedARGB >>> 24) & 0xFF;
        int unpackedRed   = (packedARGB >> 16) & 0xFF;
        int unpackedGreen = (packedARGB >> 8) & 0xFF;
        int unpackedBlue  = packedARGB & 0xFF;

        System.out.printf("Unpacked Channels        : Alpha=%d, Red=%d, Green=%d, Blue=%d%n%n",
                unpackedAlpha, unpackedRed, unpackedGreen, unpackedBlue);

        // 6. Fast Student ID & Fee Batch Hash Encoding (Barrackpore Center)
        System.out.println("--- 6. BARRACKPORE FAST PACKET ENCODING ---");
        encodeStudentSecurityPacket(101, 15000); // Swadeep: Roll 101, Fee ₹15,000
        encodeStudentSecurityPacket(102, 22000); // Tuhina: Roll 102, Fee ₹22,000

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. '<<' shifts left (multiplies by 2^s); fills with 0s.");
        System.out.println("2. '>>' signed right shift preserves sign bit (fills with 0s for positive, 1s for negative).");
        System.out.println("3. '>>>' unsigned right shift ALWAYS fills vacated bits with 0s (zero extension).");
        System.out.println("4. For 32-bit int, shift distance is masked with 0x1F (distance % 32).");
        System.out.println("================================================================================");
    }

    private static void encodeStudentSecurityPacket(int rollNumber, int feeAmount) {
        // Pack roll (16 bits) and fee (16 bits) into single 32-bit integer:
        int packedPacket = (rollNumber << 16) | (feeAmount & 0xFFFF);
        int decodedRoll = packedPacket >>> 16;
        int decodedFee = packedPacket & 0xFFFF;

        System.out.printf("Encoded Packet: 0x%08X -> Decoded Student Roll: #%d | Tuition Fee: ₹%,d%n",
                packedPacket, decodedRoll, decodedFee);
    }

    private static String to32BitBinary(int value) {
        return String.format("%32s", Integer.toBinaryString(value)).replace(' ', '0');
    }
}
