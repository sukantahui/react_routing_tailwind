/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 13: The Fragile Base Class Problem Explained
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class FragileBaseClassProblemDemo {

    // Base Class (Vendor / Parent Library)
    public static class BaseEnrollmentRepository {
        public void addStudent(String name) {
            System.out.println("  [BASE] Added student: " + name);
        }

        public void addAllStudents(String[] names) {
            // Version 1 of Base Class calls addStudent() internally in loop
            for (String name : names) {
                addStudent(name);
            }
        }
    }

    // Subclass (Attempting to count additions)
    public static class AuditedEnrollmentRepository extends BaseEnrollmentRepository {
        private int addCount = 0;

        @Override
        public void addStudent(String name) {
            addCount++;
            super.addStudent(name);
        }

        @Override
        public void addAllStudents(String[] names) {
            // BUG RISK (Fragile Base Class):
            // If we increment by names.length AND call super.addAllStudents(),
            // and super internally calls addStudent(), addCount is DOUBLED!
            addCount += names.length;
            super.addAllStudents(names);
        }

        public int getAddCount() { return addCount; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: THE FRAGILE BASE CLASS PROBLEM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AuditedEnrollmentRepository repo = new AuditedEnrollmentRepository();
        String[] batch = {"Swadeep Paul", "Tuhina Das", "Debangshu Mukherjee"};

        System.out.println(">>> Adding batch of 3 students:");
        repo.addAllStudents(batch);

        System.out.println("\n>>> Observe the Double Counting Bug:");
        System.out.println("  Expected Count: 3");
        System.out.println("  Actual Count  : " + repo.getAddCount() + " (Double Counted due to Superclass Coupling!)");

        System.out.println("\n==========================================================================");
    }
}