/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 12: Record Patterns (Java 21+ Standard - JEP 440) - Direct Deconstruction
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class RecordPatternsJep440Demo {

    public record Center(String city, String district) {}
    public record Student(String name, Center center, double score) {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: RECORD PATTERNS (JEP 440) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Object studentObj = new Student("Swadeep Paul", new Center("Barrackpore", "North 24 Parganas"), 94.5);

        // 1. Basic Record Pattern with instanceof: Direct Deconstruction!
        if (studentObj instanceof Student(String name, Center center, double score)) {
            System.out.println("1. Deconstructed Student Record Directly:");
            System.out.println("   - Extracted Name  : " + name);
            System.out.println("   - Extracted Center: " + center.city());
            System.out.println("   - Extracted Score : " + score + "%");
        }

        // 2. NESTED Record Pattern (Deep Destructuring in 1 Step!):
        System.out.println("\n2. Deep Nested Record Destructuring in Java 21:");
        if (studentObj instanceof Student(String name, Center(String city, String district), double score)) {
            System.out.println("   - Student Name    : " + name);
            System.out.println("   - Extracted City  : " + city);
            System.out.println("   - Extracted Dist  : " + district);
            System.out.println("   - Extracted Score : " + score + "%");
        }

        System.out.println("\n==========================================================================");
    }
}
