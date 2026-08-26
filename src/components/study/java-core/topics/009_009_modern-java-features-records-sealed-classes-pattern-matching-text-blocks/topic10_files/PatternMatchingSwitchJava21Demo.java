/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 10: Pattern Matching for switch & when Guards (Java 21+ Standard - JEP 441)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class PatternMatchingSwitchJava21Demo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: PATTERN MATCHING FOR SWITCH (JAVA 21) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> TESTING JAVA 21 PATTERN SWITCH WITH GUARDS (when):");
        System.out.println("  1. " + formatValue("Swadeep Paul"));
        System.out.println("  2. " + formatValue("A"));
        System.out.println("  3. " + formatValue(95));
        System.out.println("  4. " + formatValue(45));
        System.out.println("  5. " + formatValue(new Student(101, "Tuhina Das")));
        System.out.println("  6. " + formatValue(null));

        System.out.println("\n==========================================================================");
    }

    // Modern Java 21 Pattern Matching switch Expression:
    static String formatValue(Object obj) {
        return switch (obj) {
            case null -> "NULL VALUE DETECTED (Handled safely without NPE!)";
            // Pattern with guard clause 'when':
            case String s when s.length() > 5 -> "Long String (" + s.length() + " chars): " + s.toUpperCase();
            case String s -> "Short String: " + s;
            case Integer i when i >= 85 -> "Distinction Score: " + i + "%";
            case Integer i -> "Standard Score: " + i + "%";
            case Student s -> "Student Record: ID " + s.id() + ", Name: " + s.name();
            default -> "Unrecognized Type: " + obj.getClass().getSimpleName();
        };
    }

    record Student(int id, String name) {}
}
