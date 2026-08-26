/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 0: Why Character Streams Are Needed: Multi-Byte Unicode & International Text
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class WhyCharacterStreamsAreEssentialDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY CHARACTER STREAMS ARE ESSENTIAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Bengali Text with Multi-Byte UTF-8 characters (3 bytes per Bengali character!):
        String bengaliGreeting = "নমস্কার ব্যারাকপুর (Namaskar Barrackpore) 🚀";
        byte[] utf8Bytes = bengaliGreeting.getBytes(StandardCharsets.UTF_8);

        System.out.println(">>> 1. The Multi-Byte Nature of International Text:");
        System.out.println("  Original Text Length (Characters) : " + bengaliGreeting.length());
        System.out.println("  UTF-8 Encoded Length (Raw Bytes)  : " + utf8Bytes.length + " bytes (3x expansion!)");

        System.out.println("\n>>> 2. The Byte Stream Trap (Reading 1 raw byte at a time corrupts characters):");
        System.out.print("  Byte Stream Cast Output: ");
        for (int i = 0; i < Math.min(12, utf8Bytes.length); i++) {
            System.out.print((char) utf8Bytes[i]); // CORRUPTS Unicode characters!
        }
        System.out.println(" <-- Mojibake / Corrupted Garbage!");

        System.out.println("\n>>> 3. The Character Stream Solution (Reader handles multi-byte decoding seamlessly):");
        try (InputStreamReader reader = new InputStreamReader(new ByteArrayInputStream(utf8Bytes), StandardCharsets.UTF_8)) {
            System.out.print("  Character Stream Output: ");
            int ch;
            while ((ch = reader.read()) != -1) {
                System.out.print((char) ch); // Correctly reconstructs complete Unicode code points!
            }
            System.out.println();
        }

        System.out.println("\n>>> WHY CHARACTER STREAMS WIN FOR TEXT:");
        System.out.println("  1. Byte Streams (InputStream/OutputStream) operate on raw 8-bit bytes (0-255).");
        System.out.println("  2. Character Streams (Reader/Writer) operate on 16-bit UTF-16 characters & handle multi-byte decoding.");
        System.out.println("  3. Completely eliminates character corruption and encoding mismatch bugs.");

        System.out.println("\n==========================================================================");
    }
}