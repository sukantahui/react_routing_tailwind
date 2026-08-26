/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 0: What are Regular Expressions (Regex) & Their Role in Enterprise Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

public class RegexOverviewFoundationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: REGULAR EXPRESSIONS (REGEX) OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 3 Core Capabilities of Regex in Java Enterprise Systems:");
        System.out.println();
        System.out.println("  1. INPUT VALIDATION:");
        System.out.println("     Verifying that user inputs strictly match expected patterns:");
        System.out.println("     - Email Addresses, Indian Mobile (+91), PAN Cards, PIN Codes.");
        System.out.println();
        System.out.println("  2. SEARCH & INFORMATION EXTRACTION:");
        System.out.println("     Scanning unstructured server logs or documents to extract specific tokens:");
        System.out.println("     - Extracting IP addresses, transaction IDs, or error codes from log files.");
        System.out.println();
        System.out.println("  3. DATA SANITIZATION & TRANSFORMATION:");
        System.out.println("     Masking confidential credit cards, normalizing phone formats, or stripping HTML tags.");

        // Quick demonstration using String.matches():
        String indianPin = "700120"; // Barrackpore Post Office PIN Code
        boolean isValidPin = indianPin.matches("\\d{6}"); // Exactly 6 digits
        System.out.println("\n>>> Verification: Is '" + indianPin + "' a valid 6-digit Indian PIN Code? " + isValidPin);

        System.out.println("\n==========================================================================");
    }
}