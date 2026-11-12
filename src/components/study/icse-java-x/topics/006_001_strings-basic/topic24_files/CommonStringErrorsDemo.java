/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 24: Common Errors (== Misuse, Index Errors, Null Issues)
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class CommonStringErrorsDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   COMMON STRING ERRORS & DEBUGGING IN JAVA       ");
        System.out.println("==================================================");

        // Trap 1: Confusing == with equals()
        String userInput = new String("Barrackpore");
        System.out.println("[Trap 1: '==' on Scanner/Heap Strings]:");
        System.out.println("    userInput == \"Barrackpore\"      : " + (userInput == "Barrackpore") + " [MISTAKE!]");
        System.out.println("    userInput.equals(\"Barrackpore\") : " + userInput.equals("Barrackpore") + " [CORRECT]");

        // Trap 2: Discarding the return value of immutable methods
        String city = "kolkata";
        city.toUpperCase(); // Bug: return value ignored!
        System.out.println("\n[Trap 2: Discarded Immutable Return Value]:");
        System.out.println("    After city.toUpperCase(): " + city + " (Still lowercase!)");
        city = city.toUpperCase(); // Fix
        System.out.println("    After city = city.toUpperCase(): " + city + " (Fixed)");

        // Trap 3: StringIndexOutOfBoundsException
        String test = "ICSE";
        System.out.println("\n[Trap 3: Off-by-one Index Boundary]:");
        System.out.println("    Valid Index Range for \"" + test + "\": 0 to " + (test.length() - 1));
        try {
            char badChar = test.charAt(test.length()); // Index 4 is invalid!
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("    Caught Expected: " + e.getClass().getSimpleName() + " for index " + test.length());
        }

        // Trap 4: NullPointerException
        String nullReference = null;
        System.out.println("\n[Trap 4: Invoking method on null]:");
        try {
            int len = nullReference.length();
        } catch (NullPointerException e) {
            System.out.println("    Caught Expected: " + e.getClass().getSimpleName() + " on nullReference.length()");
        }

        // Trap 5: Array bracket notation on String
        // char c = test[0]; // COMPILE ERROR: array required, but String found
        char c = test.charAt(0);
        System.out.println("\n[Trap 5: Brackets vs charAt()]:");
        System.out.println("    Must use test.charAt(0): '" + c + "'");

        System.out.println("==================================================");
    }
}