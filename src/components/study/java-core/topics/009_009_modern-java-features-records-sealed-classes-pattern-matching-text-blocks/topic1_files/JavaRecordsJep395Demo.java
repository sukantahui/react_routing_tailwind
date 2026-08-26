/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 1: Java Records (Java 16+ Standard - JEP 395) - Immutable Data Carriers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class JavaRecordsJep395Demo {

    // 1-Line Immutable Data Carrier:
    // Automatically generates: private final fields, canonical constructor,
    // accessors id(), name(), center(), score(), equals(), hashCode(), toString()!
    public record StudentRecord(int id, String name, String center, double score) {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: JAVA RECORDS (JEP 395) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        StudentRecord s1 = new StudentRecord(101, "Swadeep Paul", "Barrackpore", 94.5);
        StudentRecord s2 = new StudentRecord(101, "Swadeep Paul", "Barrackpore", 94.5);
        StudentRecord s3 = new StudentRecord(102, "Tuhina Das", "Naihati", 96.0);

        // 1. Auto-generated toString():
        System.out.println("1. Auto-generated toString():\n   " + s1);

        // 2. Auto-generated Accessor methods (name() NOT getName()):
        System.out.println("\n2. Accessor methods:");
        System.out.println("   - ID     : " + s1.id());
        System.out.println("   - Name   : " + s1.name());
        System.out.println("   - Center : " + s1.center());
        System.out.println("   - Score  : " + s1.score() + "%");

        // 3. Auto-generated Value-based equals() & hashCode():
        System.out.println("\n3. Value Equality (equals & hashCode):");
        System.out.println("   - s1.equals(s2) (Identical data) : " + s1.equals(s2) + " (TRUE!)");
        System.out.println("   - s1.equals(s3) (Different data) : " + s1.equals(s3) + " (FALSE)");
        System.out.println("   - s1.hashCode() == s2.hashCode() : " + (s1.hashCode() == s2.hashCode()));

        System.out.println("\n==========================================================================");
    }
}
