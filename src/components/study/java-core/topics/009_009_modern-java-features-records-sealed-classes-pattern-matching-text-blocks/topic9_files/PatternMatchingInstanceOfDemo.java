/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 9: Pattern Matching for instanceof (Java 16+ Standard - JEP 394)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class PatternMatchingInstanceOfDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: PATTERN MATCHING FOR INSTANCEOF - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Object mysteryObject1 = "Swadeep Paul (Barrackpore)";
        Object mysteryObject2 = 94.5;
        Object mysteryObject3 = new Student(101, "Tuhina Das");

        System.out.println(">>> TESTING MODERN PATTERN MATCHING INSTANCEOF:");
        inspectObject(mysteryObject1);
        inspectObject(mysteryObject2);
        inspectObject(mysteryObject3);

        // Conditional Pattern Matching with Flow Scoping (using && operator):
        Object textObj = "   Java Core 21 LTS   ";
        if (textObj instanceof String s && !s.isBlank()) {
            System.out.println("\n>>> Pattern with Guard (&& s.isBlank()): Trimmed -> '" + s.trim() + "'");
        }

        System.out.println("\n==========================================================================");
    }

    static void inspectObject(Object obj) {
        // Modern Java 16+: Combines type check and casting into one step!
        if (obj instanceof String s) {
            System.out.println("  - Matched String  : " + s.toUpperCase() + " (Length: " + s.length() + ")");
        } else if (obj instanceof Double d) {
            System.out.println("  - Matched Double  : " + d + " (Formatted: " + String.format("%.2f", d) + "%)");
        } else if (obj instanceof Student s) {
            System.out.println("  - Matched Student : ID " + s.id() + ", Name: " + s.name());
        }
    }

    record Student(int id, String name) {}
}
