/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 13: Converting String to Char Array & Byte Array (StandardCharsets.UTF_8)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class StringToCharArrayAndByteArrayDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: toCharArray() & getBytes(UTF_8) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String academy = "Barrackpore";

        // 1. Converting String to char[]:
        char[] charArr = academy.toCharArray();
        System.out.println(">>> 1. char[] Array (16-bit UTF-16 code units):");
        System.out.println("  charArr: " + Arrays.toString(charArr));

        // 2. Converting String to byte[] using explicit StandardCharsets.UTF_8:
        byte[] utf8Bytes = academy.getBytes(StandardCharsets.UTF_8);
        System.out.println("\n>>> 2. byte[] UTF-8 Binary Bytes (For Network & File I/O):");
        System.out.println("  byte[] Length : " + utf8Bytes.length + " bytes");
        System.out.println("  utf8Bytes     : " + Arrays.toString(utf8Bytes));

        // 3. Reconstructing String from byte[]:
        String reconstructed = new String(utf8Bytes, StandardCharsets.UTF_8);
        System.out.println("\n>>> 3. Reconstructed String from bytes:");
        System.out.println("  Result: "" + reconstructed + """);

        System.out.println("\n>>> BEST PRACTICE: NEVER call getBytes() without specifying StandardCharsets.UTF_8!");

        System.out.println("\n==========================================================================");
    }
}