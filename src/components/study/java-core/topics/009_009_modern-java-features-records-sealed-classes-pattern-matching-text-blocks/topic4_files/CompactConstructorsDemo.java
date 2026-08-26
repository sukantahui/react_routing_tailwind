/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 4: Customizing Records - Compact Constructors & Data Normalization
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class CompactConstructorsDemo {

    public record StudentRegistration(String name, String center, double score) {

        // 1. COMPACT CONSTRUCTOR: No parameter list required!
        // Ideal for input validation and data normalization (e.g. trimming strings):
        public StudentRegistration {
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException("Student name cannot be null or blank!");
            }
            if (score < 0.0 || score > 100.0) {
                throw new IllegalArgumentException("Score must be between 0.0 and 100.0!");
            }
            // Data normalization:
            name = name.trim();
            center = center != null ? center.trim() : "Barrackpore (Default)";
            // Note: 'this.name = name' assignment happens AUTOMATICALLY after this block!
        }

        // 2. Custom Business Methods inside Records:
        public boolean isDistinction() {
            return score >= 85.0;
        }

        // 3. Static Factory Method:
        public static StudentRegistration ofDefault(String name, double score) {
            return new StudentRegistration(name, "Barrackpore", score);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: COMPACT CONSTRUCTORS & VALIDATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Valid Record Creation with automatic trimming:
        StudentRegistration s1 = new StudentRegistration("  Swadeep Paul  ", " Naihati ", 94.5);
        System.out.println("1. Clean Normalized Record:");
        System.out.println("   - Name   : '" + s1.name() + "' (Trimmed)");
        System.out.println("   - Center : '" + s1.center() + "' (Trimmed)");
        System.out.println("   - Distinction? " + s1.isDistinction());

        // 2. Invalid Record Creation (Triggers validation exception in compact constructor):
        System.out.println("\n2. Testing Validation Failure (Negative Score):");
        try {
            new StudentRegistration("Tuhina Das", "Barrackpore", -15.0);
        } catch (IllegalArgumentException ex) {
            System.err.println("   [VALIDATION FAILED]: " + ex.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}
