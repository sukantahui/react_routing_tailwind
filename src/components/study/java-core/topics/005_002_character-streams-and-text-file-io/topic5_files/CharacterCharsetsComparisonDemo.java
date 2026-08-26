/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 5: Character Encodings & Charsets: UTF-8, UTF-16, US-ASCII & ISO-8859-1
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.nio.charset.StandardCharsets;

public class CharacterCharsetsComparisonDemo {

    public static void inspectEncoding(String sampleText) {
        System.out.println("  Input Text: "" + sampleText + """);

        byte[] asciiBytes = sampleText.getBytes(StandardCharsets.US_ASCII);
        byte[] isoBytes   = sampleText.getBytes(StandardCharsets.ISO_8859_1);
        byte[] utf8Bytes  = sampleText.getBytes(StandardCharsets.UTF_8);
        byte[] utf16Bytes = sampleText.getBytes(StandardCharsets.UTF_16);

        System.out.printf("  - US-ASCII   : %2d bytes (7-bit English only)%n", asciiBytes.length);
        System.out.printf("  - ISO-8859-1 : %2d bytes (8-bit Western European)%n", isoBytes.length);
        System.out.printf("  - UTF-8      : %2d bytes (1 to 4 bytes variable - World Standard!)%n", utf8Bytes.length);
        System.out.printf("  - UTF-16     : %2d bytes (2 or 4 bytes fixed - Internal Java memory)%n%n", utf16Bytes.length);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: CHARACTER ENCODING & CHARSETS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. ASCII English Text:");
        inspectEncoding("Barrackpore");

        System.out.println(">>> 2. International Multi-Byte Text (Bengali):");
        inspectEncoding("ব্যারাকপুর");

        System.out.println(">>> 3. Emojis & Supplementary Code Points:");
        inspectEncoding("Java 🚀🔥");

        System.out.println("==========================================================================");
    }
}