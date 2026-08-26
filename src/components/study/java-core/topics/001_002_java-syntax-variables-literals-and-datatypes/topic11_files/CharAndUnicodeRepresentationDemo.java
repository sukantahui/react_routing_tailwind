/**
 * File: CharAndUnicodeRepresentationDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 11)
 * Description: Demonstrates Java 16-bit unsigned char primitive type, ASCII mapping,
 *              arithmetic operations on chars, Unicode escape sequences (\\uXXXX),
 *              Bengali script characters, Indian Rupee (₹) symbol, and surrogate pairs.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

public class CharAndUnicodeRepresentationDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 CHAR, ASCII & UNICODE (\\uXXXX)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Fundamentals of Char: 16-bit Unsigned Primitive
        System.out.println("--- 1. CHAR PRIMITIVE CHARACTERISTICS ---");
        char letterA = 'A';
        char digitNine = '9';
        char minChar = Character.MIN_VALUE; // '\u0000' (Numeric: 0)
        char maxChar = Character.MAX_VALUE; // '\uffff' (Numeric: 65535)

        System.out.printf("Letter 'A' value        : %c (ASCII Integer: %d)%n", letterA, (int) letterA);
        System.out.printf("Digit '9' value         : %c (ASCII Integer: %d)%n", digitNine, (int) digitNine);
        System.out.printf("Char Min Value (Numeric): %d (Hex: 0x%04X)%n", (int) minChar, (int) minChar);
        System.out.printf("Char Max Value (Numeric): %d (Hex: 0x%04X)%n%n", (int) maxChar, (int) maxChar);

        // 2. ASCII Character Manipulation & Arithmetic
        System.out.println("--- 2. ASCII ARITHMETIC & PROMOTIONS ---");
        char baseChar = 'A';
        // 'A' + 1 promotes both operands to 'int', returning 66:
        int sumInt = baseChar + 1;
        char nextLetter = (char) (baseChar + 1); // Explicit cast yields 'B'

        // Compound increment operators implicitly cast back to char:
        char counter = 'a';
        counter++; // counter becomes 'b'

        System.out.printf("baseChar + 1 (int)      : %d%n", sumInt);
        System.out.printf("(char) (baseChar + 1)   : %c%n", nextLetter);
        System.out.printf("counter after counter++ : %c (ASCII: %d)%n", counter, (int) counter);

        // Converting numeric char '5' to actual integer 5:
        char digitChar = '7';
        int numericVal = digitChar - '0'; // 55 - 48 = 7
        System.out.printf("Converting '%c' to int   : %d (via '%c' - '0')%n%n", digitChar, numericVal, digitChar);

        // 3. Unicode Escape Sequences (\uXXXX)
        System.out.println("--- 3. UNICODE ESCAPE SEQUENCES (\\uXXXX) ---");
        char rupeeSign = '\u20B9';    // Indian Rupee Symbol (₹)
        char copyright = '\u00A9';    // ©
        char greekOmega = '\u03A9';   // Ω
        char degreeSymbol = '\u00B0'; // °

        System.out.printf("Indian Rupee Symbol     : %c (Unicode: \\u20B9)%n", rupeeSign);
        System.out.printf("Copyright Symbol        : %c (Unicode: \\u00A9)%n", copyright);
        System.out.printf("Greek Capital Omega     : %c (Unicode: \\u03A9)%n", greekOmega);
        System.out.printf("Temperature in Kolkata  : 34%cC%n%n", degreeSymbol);

        // 4. Regional Indian Languages: Bengali Script in Barrackpore
        System.out.println("--- 4. BENGALI SCRIPT UNICODE (BARRACKPORE) ---");
        // Bengali consonants: ক (\u0995), খ (\u0996), গ (\u0997), ব (\u09AC)
        char bengaliKa = '\u0995'; // ক
        char bengaliBa = '\u09AC'; // ব
        char bengaliRa = '\u09B0'; // র

        System.out.printf("Bengali Ka (ক)          : %c (\\u0995)%n", bengaliKa);
        System.out.printf("Bengali Ba (ব)          : %c (\\u09AC)%n", bengaliBa);
        System.out.printf("Bengali Ra (র)          : %c (\\u09B0)%n", bengaliRa);
        
        // Combining into Barrackpore acronym:
        String barrackporeBengali = "\u09AC\u09BE\u09B0\u09BE\u0995\u09AA\u09C1\u09B0";
        System.out.printf("Barrackpore in Bengali : %s%n%n", barrackporeBengali);

        // 5. Character Utility Methods (java.lang.Character)
        System.out.println("--- 5. JAVA.LANG.CHARACTER UTILITY METHODS ---");
        char testChar = 'k';
        System.out.printf("Character.isLetter('%c')   : %b%n", testChar, Character.isLetter(testChar));
        System.out.printf("Character.isDigit('%c')    : %b%n", testChar, Character.isDigit(testChar));
        System.out.printf("Character.isWhitespace(' '): %b%n", Character.isWhitespace(' '));
        System.out.printf("Character.toUpperCase('%c'): %c%n", testChar, Character.toUpperCase(testChar));
        System.out.printf("Character.isUpperCase('%c'): %b%n%n", testChar, Character.isUpperCase(testChar));

        // 6. Supplementary Characters & Surrogate Pairs (Code Points > 0xFFFF)
        System.out.println("--- 6. SUPPLEMENTARY CHARACTERS & SURROGATE PAIRS ---");
        // Emojis like Rocket 🚀 (U+1F680) exceed 16 bits (0xFFFF) and require 2 chars (High + Low Surrogate):
        String rocketEmoji = "\uD83D\uDE80";
        System.out.printf("Rocket Emoji            : %s%n", rocketEmoji);
        System.out.printf("rocketEmoji.length()    : %d (2 char code units!)%n", rocketEmoji.length());
        System.out.printf("Actual Code Point Count : %d (1 real unicode character)%n%n", rocketEmoji.codePointCount(0, rocketEmoji.length()));

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'char' in Java is 16-bit unsigned (0 to 65,535) using UTF-16 code units.");
        System.out.println("2. Any math on char (+, -) promotes to int. Use (char) casting or ++/--.");
        System.out.println("3. Use Unicode escapes (\\uXXXX) to represent any global symbol (e.g. ₹, Bengali, Greek).");
        System.out.println("4. Characters above U+FFFF require surrogate pairs (2 char units).");
        System.out.println("================================================================================");
    }
}
