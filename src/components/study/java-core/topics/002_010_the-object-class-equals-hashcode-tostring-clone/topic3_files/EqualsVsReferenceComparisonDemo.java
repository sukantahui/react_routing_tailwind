/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 3: The 'equals(Object obj)' Method: Reference Identity (==) vs Semantic Equality
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class EqualsVsReferenceComparisonDemo {

    public static class StudentRecord {
        private int studentId;
        private String name;

        public StudentRecord(int id, String name) {
            this.studentId = id;
            this.name = name;
        }

        // SEMANTIC EQUALITY: Overriding equals() to compare field values!
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true; // Reference check
            if (obj == null || getClass() != obj.getClass()) return false;
            StudentRecord other = (StudentRecord) obj;
            return this.studentId == other.studentId &&
                   (this.name != null && this.name.equals(other.name));
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: '==' VS 'equals()' IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentRecord s1 = new StudentRecord(101, "Swadeep Paul");
        StudentRecord s2 = new StudentRecord(101, "Swadeep Paul"); // Separate Heap instance!

        System.out.println(">>> 1. Comparing with '==' operator (Reference Identity / Memory Address):");
        System.out.println("  s1 == s2                  : " + (s1 == s2) + " (Different memory addresses!)");

        System.out.println("\n>>> 2. Comparing with overridden 'equals()' (Semantic Value Equality):");
        System.out.println("  s1.equals(s2)             : " + s1.equals(s2) + " (Identical studentId & name!)");

        System.out.println("\n==========================================================================");
    }
}