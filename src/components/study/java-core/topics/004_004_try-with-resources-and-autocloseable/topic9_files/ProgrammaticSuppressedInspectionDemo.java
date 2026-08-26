/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 9: Programmatic Inspection of Suppressed Exceptions using Throwable.getSuppressed()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ProgrammaticSuppressedInspectionDemo {

    // Simulating multiple resources failing during close():
    public static class FlawedResource implements AutoCloseable {
        private final String resourceName;

        public FlawedResource(String name) { this.resourceName = name; }

        public void execute() {
            throw new RuntimeException("Primary failure in " + resourceName + " business execution!");
        }

        @Override
        public void close() {
            throw new RuntimeException("Close failure in " + resourceName);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: PROGRAMMATIC getSuppressed() INSPECTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        try (
            FlawedResource r1 = new FlawedResource("Resource_Alpha");
            FlawedResource r2 = new FlawedResource("Resource_Beta")
        ) {
            r1.execute();
        } catch (Exception ex) {
            System.out.println(">>> 1. PRIMARY ROOT EXCEPTION:");
            System.out.println("  Class   : " + ex.getClass().getName());
            System.out.println("  Message : " + ex.getMessage());

            System.out.println("\n>>> 2. ITERATING ALL SUPPRESSED EXCEPTIONS:");
            Throwable[] suppressed = ex.getSuppressed();
            System.out.println("  Suppressed Count: " + suppressed.length);

            for (int i = 0; i < suppressed.length; i++) {
                System.out.printf("  [%d] Suppressed Message: %s%n", i + 1, suppressed[i].getMessage());
            }

            System.out.println("\n>>> 3. PRINTING COMPOSITE STACK TRACE:");
            ex.printStackTrace(System.out); // Built-in printStackTrace automatically includes suppressed lines!
        }

        System.out.println("\n==========================================================================");
    }
}