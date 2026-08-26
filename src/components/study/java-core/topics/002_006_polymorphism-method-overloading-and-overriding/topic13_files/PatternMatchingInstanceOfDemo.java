/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 13: Modern Pattern Matching for instanceof (Java 16+ JEP 394)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class PatternMatchingInstanceOfDemo {

    public interface CertificationCandidate {}

    public static class JavaSpecialist implements CertificationCandidate {
        public String getSpecialty() { return "Spring Boot Cloud Microservices"; }
    }

    public static class DbAdministrator implements CertificationCandidate {
        public String getDbEngine() { return "PostgreSQL & MySQL Clusters"; }
    }

    public static void evaluateCandidate(Object candidate) {
        // ====================================================================
        // MODERN PATTERN MATCHING FOR INSTANCEOF (Java 16+):
        // Automatically tests type AND binds a scoped local variable in 1 step!
        // No explicit '(JavaSpecialist) candidate' cast required!
        // ====================================================================
        if (candidate instanceof JavaSpecialist js) {
            System.out.println("  [JAVA PRO MATCHED] Specialty: " + js.getSpecialty());
        } else if (candidate instanceof DbAdministrator dba) {
            System.out.println("  [DBA MATCHED] Engine: " + dba.getDbEngine());
        } else if (candidate instanceof String s && !s.isBlank()) {
            System.out.println("  [STRING TEXT MATCHED] Value: " + s.toUpperCase());
        } else {
            System.out.println("  [UNKNOWN] Candidate entity not recognized.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: MODERN PATTERN MATCHING FOR instanceof (JAVA 16+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Evaluating JavaSpecialist (Swadeep):");
        evaluateCandidate(new JavaSpecialist());

        System.out.println("\n>>> 2. Evaluating DbAdministrator (Tuhina):");
        evaluateCandidate(new DbAdministrator());

        System.out.println("\n>>> 3. Evaluating String with guard expression (&& !s.isBlank()):");
        evaluateCandidate("barrackpore hub developer");

        System.out.println("\n==========================================================================");
    }
}