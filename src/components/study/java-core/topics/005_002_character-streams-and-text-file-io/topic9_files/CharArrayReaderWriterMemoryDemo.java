/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 9: CharArrayReader & CharArrayWriter: High-Speed In-Memory Text Streams
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.CharArrayReader;
import java.io.CharArrayWriter;
import java.io.IOException;

public class CharArrayReaderWriterMemoryDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: CharArrayReader & CharArrayWriter - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. CharArrayWriter (Dynamic in-memory character buffer):
        CharArrayWriter charWriter = new CharArrayWriter();
        charWriter.write("Barrackpore ");
        charWriter.write("Academic ");
        charWriter.write("Ledger 2026");

        char[] capturedChars = charWriter.toCharArray();
        System.out.println(">>> 1. CharArrayWriter Buffer Content:");
        System.out.println("  Size in Chars : " + charWriter.size());
        System.out.println("  Extracted Array: " + new String(capturedChars));

        // 2. CharArrayReader (Reading from in-memory character array):
        System.out.println("\n>>> 2. CharArrayReader Stream Traversal:");
        try (CharArrayReader charReader = new CharArrayReader(capturedChars)) {
            int ch;
            while ((ch = charReader.read()) != -1) {
                System.out.print((char) Character.toUpperCase(ch));
            }
            System.out.println();
        }

        System.out.println("\n>>> USE CASES FOR CharArrayReader / CharArrayWriter:");
        System.out.println("  1. Unit Testing: Mocking stream APIs in JUnit without touching physical disk files.");
        System.out.println("  2. In-Memory Text Transformation: Fast intermediate buffering before writing to disk/network.");

        System.out.println("\n==========================================================================");
    }
}