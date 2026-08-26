/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 12: NumberFormatException: Root Causes & Robust Defensive Validation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class NumberFormatExceptionDefensiveHandlingDemo {

    public static int parseAgeDefensively(String rawInput, int defaultAge) {
        if (rawInput == null || rawInput.isBlank()) {
            return defaultAge; // Safe fallback for null or empty strings
        }
        try {
            return Integer.parseInt(rawInput.strip());
        } catch (NumberFormatException e) {
            System.out.printf("  [WARN] Invalid integer format: '%s'. Falling back to default %d.\n", rawInput, defaultAge);
            return defaultAge;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: NumberFormatException DEFENSIVE VALIDATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The 4 Common Triggers for NumberFormatException:");
        System.out.println("  1. Non-numeric characters     : "123a"");
        System.out.println("  2. Floating-point in parseInt : "12.34"");
        System.out.println("  3. Out-of-bounds overflow     : "9999999999999999999" (Exceeds 2^31-1)");
        System.out.println("  4. Null or empty string       : "" or null");

        System.out.println("\n>>> 2. Testing Defensive Validation Method:");
        System.out.println("  Result 1 ("25"): " + parseAgeDefensively("25", 18));
        System.out.println("  Result 2 ("  40  "): " + parseAgeDefensively("  40  ", 18));
        System.out.println("  Result 3 ("twenty"): " + parseAgeDefensively("twenty", 18));
        System.out.println("  Result 4 (null): " + parseAgeDefensively(null, 18));

        System.out.println("\n==========================================================================");
    }
}