/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 1: Parent (Super/Base) Class and Child (Sub/Derived) Class Relationship
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class SuperSubclassRelationshipDemo {

    // General Superclass
    public static class EducationalEntity {
        protected String entityType = "General Academy Entity";

        public void printTaxonomy() {
            System.out.println("  [BASE ENTITY] Root taxonomy: EducationalEntity");
        }
    }

    // Specialized Subclass
    public static class SoftwareDepartment extends EducationalEntity {
        private String leadTech = "Java Core & Spring";

        public SoftwareDepartment() {
            this.entityType = "Technical Department";
        }

        public void printDepartment() {
            super.printTaxonomy();
            System.out.println("  -> Department Type: " + this.entityType);
            System.out.println("  -> Technology Focus: " + this.leadTech);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: SUPERCLASS & SUBCLASS RELATIONSHIP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SoftwareDepartment dept = new SoftwareDepartment();
        dept.printDepartment();

        System.out.println("\n==========================================================================");
    }
}