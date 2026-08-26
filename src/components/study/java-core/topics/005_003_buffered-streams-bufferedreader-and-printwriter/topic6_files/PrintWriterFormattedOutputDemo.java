/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 6: java.io.PrintWriter: Versatile Formatted Text Output (print, println, printf)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.PrintWriter;
import java.io.StringWriter;

public class PrintWriterFormattedOutputDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: java.io.PrintWriter FORMATTED OUTPUT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StringWriter buffer = new StringWriter();

        // 1. PrintWriter formatted output:
        try (PrintWriter pw = new PrintWriter(buffer)) {
            pw.println("=========================================================");
            pw.println("  ACCOTAX FINANCIAL REPORT - BARRACKPORE HUB");
            pw.println("=========================================================");

            // Formatted columns with printf():
            pw.printf("%-10s | %-18s | %10s | %8s%n", "ROLL", "STUDENT NAME", "FEE (INR)", "STATUS");
            pw.println("-----------+--------------------+------------+---------");
            pw.printf("%-10s | %-18s | %10.2f | %8s%n", "STU_101", "Swadeep Paul", 8500.50, "PAID");
            pw.printf("%-10s | %-18s | %10.2f | %8s%n", "STU_102", "Tuhina Das", 9200.00, "PAID");
            pw.printf("%-10s | %-18s | %10.2f | %8s%n", "STU_103", "Abhronila Das", 8500.00, "PENDING");
            pw.println("=========================================================");
        }

        System.out.println(">>> Formatted Report from PrintWriter:");
        System.out.println(buffer.toString());

        System.out.println("\n>>> WHY PrintWriter IS THE MOST POPULAR FORMATTER:");
        System.out.println("  1. Supports all primitive types via print() and println().");
        System.out.println("  2. Full C-style format strings via printf() and format().");
        System.out.println("  3. Optional auto-flush feature when writing newlines.");

        System.out.println("\n==========================================================================");
    }
}