/**
 * File: DecimalToBinaryHexConversionDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 6)
 * Description: Implements Decimal to Binary and Hexadecimal base conversion algorithms without built-in methods:
 *              1. Decimal to Binary via Successive Modulo 2 Division & Bitwise Shift Masking
 *              2. Decimal to Hexadecimal via Successive Modulo 16 Division & 4-bit Nibble Masking
 *              3. Two's Complement representation for negative integers
 *              4. Reverse Base Conversion (Binary/Hex to Decimal) using Horner's method
 *              for network byte protocols and memory address debugging at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

public class DecimalToBinaryHexConversionDemo {

    private static final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();

    // =========================================================================
    // 1. DECIMAL TO BINARY: Successive Division by 2 (Positive integers)
    // =========================================================================
    public static String decimalToBinaryDivision(int n) {
        if (n == 0) return "0";
        if (n < 0) return decimalToBinaryBitwise(n); // Delegate negative to bitwise

        StringBuilder sb = new StringBuilder();
        while (n > 0) {
            int remainder = n % 2;
            sb.append(remainder);
            n /= 2;
        }
        return sb.reverse().toString();
    }

    // =========================================================================
    // 2. DECIMAL TO BINARY: Bitwise Shift & Mask (Handles Negative & 32-bit)
    // =========================================================================
    public static String decimalToBinaryBitwise(int n) {
        StringBuilder sb = new StringBuilder();
        // Read each bit from MSB (bit 31) to LSB (bit 0):
        for (int bit = 31; bit >= 0; bit--) {
            int bitVal = (n >>> bit) & 1; // Logical unsigned shift
            sb.append(bitVal);
        }
        // Trim leading zeros for positive numbers, or format as 32-bit block
        String full32 = sb.toString();
        int firstOne = full32.indexOf('1');
        return (firstOne == -1) ? "0" : full32.substring(firstOne);
    }

    // =========================================================================
    // 3. DECIMAL TO HEXADECIMAL: Modulo 16 Division & Nibble Masking
    // =========================================================================
    public static String decimalToHexadecimal(int n) {
        if (n == 0) return "0x0";

        // Convert to unsigned 32-bit representation via long:
        long num = n & 0xFFFFFFFFL;
        StringBuilder sb = new StringBuilder();

        while (num > 0) {
            int remainder = (int) (num % 16);
            sb.append(HEX_DIGITS[remainder]);
            num /= 16;
        }
        return "0x" + sb.reverse().toString();
    }

    // =========================================================================
    // 4. REVERSE: BINARY / HEX TO DECIMAL (Horner's Method)
    // =========================================================================
    public static int binaryToDecimal(String binaryStr) {
        int result = 0;
        for (int i = 0; i < binaryStr.length(); i++) {
            char c = binaryStr.charAt(i);
            int digit = c - '0';
            result = (result * 2) + digit; // Horner's polynomial expansion
        }
        return result;
    }

    public static int hexToDecimal(String hexStr) {
        if (hexStr.startsWith("0x") || hexStr.startsWith("0X")) {
            hexStr = hexStr.substring(2);
        }
        int result = 0;
        for (int i = 0; i < hexStr.length(); i++) {
            char c = Character.toUpperCase(hexStr.charAt(i));
            int digitVal = (c >= '0' && c <= '9') ? (c - '0') : (c - 'A' + 10);
            result = (result * 16) + digitVal;
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 6 DECIMAL TO BINARY & HEX CONVERSIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int[] sampleDecimals = {0, 5, 29, 255, 1024, 65535, -42};

        System.out.println("--- 1. CONVERTING DECIMAL TO BINARY & HEXADECIMAL ---\n");
        System.out.printf("%-10s | %-34s | %-12s%n", "Decimal", "Binary (Base 2)", "Hex (Base 16)");
        System.out.println("----------------------------------------------------------------------");

        for (int dec : sampleDecimals) {
            String bin = (dec >= 0) ? decimalToBinaryDivision(dec) : decimalToBinaryBitwise(dec);
            String hex = decimalToHexadecimal(dec);
            System.out.printf("%-10d | %-34s | %-12s%n", dec, bin, hex);
        }

        System.out.println("\n--- 2. REVERSE BASE CONVERSIONS (HORNER'S METHOD) ---\n");

        String testBin = "11101"; // 29
        int recoveredFromBin = binaryToDecimal(testBin);
        System.out.printf("  Binary \"%s\"  &rarr; Decimal: %d%n", testBin, recoveredFromBin);

        String testHex = "0x1A3F"; // 6719
        int recoveredFromHex = hexToDecimal(testHex);
        System.out.printf("  Hex \"%s\"      &rarr; Decimal: %d%n%n", testHex, recoveredFromHex);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Decimal to Base B repeatedly computes remainder (n % B) and reduces (n / B).");
        System.out.println("2. For negative numbers, use bitwise unsigned shifts (>>>) and (n & 0xFFFFFFFFL).");
        System.out.println("3. Horner's Method (result = result * base + digit) reverses bases without Math.pow().");
        System.out.println("4. Hexadecimal groups binary into 4-bit chunks (nibbles) from 0x0 to 0xF.");
        System.out.println("================================================================================");
    }
}
