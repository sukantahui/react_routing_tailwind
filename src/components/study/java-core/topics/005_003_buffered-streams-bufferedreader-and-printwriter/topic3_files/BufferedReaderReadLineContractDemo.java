/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 3: BufferedReader: High-Speed Line-by-Line Processing & readLine()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class BufferedReaderReadLineContractDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: BufferedReader readLine() CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String multilineStudentRoster =
                "STU_101, Swadeep Paul, Barrackpore, Java Professional\n" +
                "STU_102, Tuhina Das, Naihati, Full Stack Developer\n" +
                "STU_103, Abhronila Das, Shyamnagar, Tax Automation\n" +
                "STU_104, Debangshu Mukherjee, Ichapur, Microservices Architect";

        System.out.println(">>> 1. Processing Lines with BufferedReader.readLine():");
        try (BufferedReader br = new BufferedReader(new StringReader(multilineStudentRoster))) {
            String line;
            int lineNumber = 1;

            // THE CANONICAL IDIOM: Returns String for valid line, or null at EOF:
            while ((line = br.readLine()) != null) {
                System.out.printf("  [LINE %d] %s%n", lineNumber++, line);
            }
        }

        System.out.println("\n>>> 3 CRITICAL INVARIANTS OF readLine():");
        System.out.println("  1. Strips Line Terminators: The returned String does NOT contain '\\n' or '\\r'.");
        System.out.println("  2. Universal Line Breaks: Recognizes '\\n' (Unix/Linux), '\\r\\n' (Windows), and '\\r' (legacy Mac).");
        System.out.println("  3. EOF Signal: Returns 'null' when end of stream is encountered.");

        System.out.println("\n==========================================================================");
    }
}