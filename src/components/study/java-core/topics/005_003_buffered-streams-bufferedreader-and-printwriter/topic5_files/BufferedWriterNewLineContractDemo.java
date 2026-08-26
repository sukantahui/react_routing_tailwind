/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 5: BufferedWriter: Buffered Text Output & Platform-Independent newLine()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.BufferedWriter;
import java.io.StringWriter;
import java.io.IOException;

public class BufferedWriterNewLineContractDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: BufferedWriter & newLine() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StringWriter memoryBuffer = new StringWriter();

        // 1. BufferedWriter Output Pipeline:
        try (BufferedWriter bw = new BufferedWriter(memoryBuffer)) {
            bw.write("Header: Barrackpore Educational Services");
            bw.newLine(); // Writes system-appropriate line separator ('
' on Windows, '
' on Linux)

            bw.write("Course: Java Core & Enterprise Backend Masterclass");
            bw.newLine();

            bw.write("Trainees: Swadeep Paul, Tuhina Das, Abhronila Das");
            bw.newLine();

            bw.flush(); // Flushes internal 8KB buffer into the underlying writer
        }

        System.out.println(">>> Formatted BufferedWriter Output:");
        System.out.println(memoryBuffer.toString());

        System.out.println(">>> WHY bw.newLine() IS CRITICAL:");
        System.out.println("  1. Hardcoding '\\n' breaks on Windows tools like Notepad (prior to modern updates).");
        System.out.println("  2. 'bw.newLine()' queries 'System.lineSeparator()' dynamically for 100% OS portability.");

        System.out.println("\n==========================================================================");
    }
}