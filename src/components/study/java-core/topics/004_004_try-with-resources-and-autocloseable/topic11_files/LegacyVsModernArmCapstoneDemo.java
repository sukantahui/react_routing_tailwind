/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 11: Definitive Architectural Comparison: Legacy try-finally vs Modern ARM (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.StringReader;

public class LegacyVsModernArmCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: LEGACY vs MODERN ARM CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+--------------------------+-------------------------------------+-------------------------------------+");
        System.out.println("| Evaluation Criterion     | Legacy try-finally (Java 1.0 - 6)   | Modern Try-with-Resources (Java 7+) |");
        System.out.println("+--------------------------+-------------------------------------+-------------------------------------+");
        System.out.println("| Boilerplate Verbosity    | Massive (20+ lines for 2 streams)   | Minimal (1 single line in header)   |");
        System.out.println("| Exception Masking        | High Risk (Finally error masks Try) | Zero Risk (Suppressed exceptions)   |");
        System.out.println("| Closing Order            | Manual, error-prone ordering        | Automatic reverse order (LIFO)      |");
        System.out.println("| Multi-Resource Safety    | First failure leaks other resources | All resources guaranteed closing    |");
        System.out.println("| Code Readability         | Severely cluttered with try-catches | Clean, declarative, and elegant     |");
        System.out.println("+--------------------------+-------------------------------------+-------------------------------------+");

        System.out.println("\n>>> Demonstrating Ultra-Clean Modern Try-with-Resources:");
        try (StringReader reader = new StringReader("Barrackpore Master Roadmap 2026")) {
            int charVal = reader.read();
            System.out.println("  Read character: '" + (char) charVal + "'");
        } catch (Exception e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 004_004 TRY-WITH-RESOURCES & AUTOCLOSEABLE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}