/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 10: StringReader & StringWriter: Wrapping Java Strings as Stream Sources & Sinks (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.IOException;

public class StringReaderWriterCapstoneDemo {

    // Method that accepts a generic Reader (Can receive File, Network, or in-memory StringReader):
    public static int countWordsInStream(java.io.Reader reader) throws IOException {
        int wordCount = 0;
        boolean inWord = false;
        int ch;

        while ((ch = reader.read()) != -1) {
            if (Character.isWhitespace(ch)) {
                inWord = false;
            } else if (!inWord) {
                inWord = true;
                wordCount++;
            }
        }
        return wordCount;
    }

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: StringReader & StringWriter CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. StringReader: Feeding a Java String into any API expecting a Reader:
        String courseText = "Barrackpore Academy trains students in Java Core Spring Boot and Microservices";
        try (StringReader strReader = new StringReader(courseText)) {
            int words = countWordsInStream(strReader);
            System.out.println(">>> 1. StringReader Word Count: " + words + " words detected.");
        }

        // 2. StringWriter: Capturing complex formatted output into an in-memory StringBuffer:
        StringWriter strWriter = new StringWriter();
        try (PrintWriter pw = new PrintWriter(strWriter)) {
            pw.printf("Student: %-15s | Hub: %s%n", "Swadeep Paul", "Barrackpore");
            pw.printf("Student: %-15s | Hub: %s%n", "Tuhina Das", "Naihati");
            pw.printf("Student: %-15s | Hub: %s%n", "Abhronila Das", "Shyamnagar");
        }

        System.out.println("\n>>> 2. StringWriter Captured Buffer Output:");
        System.out.println(strWriter.toString());

        System.out.println("==========================================================================");
        System.out.println(" MODULE 005_002 CHARACTER STREAMS & TEXT FILE PROCESSING 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}