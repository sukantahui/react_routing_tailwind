/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 8: Introduction to the 'super' Keyword in Java Inheritance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class SuperKeywordIntroductionDemo {

    // Parent Class: Foundation Academy
    public static class AcademyBase {
        protected String institutionName = "Coder & AccoTax Academy";
        protected String centralHub = "Barrackpore Main Campus";

        public void printFoundationInfo() {
            System.out.printf("  [BASE ACADEMY] %s | HQ: %s\n", institutionName, centralHub);
        }
    }

    // Child Class: Specialized Branch
    public static class SoftwareEngineeringBranch extends AcademyBase {
        private String branchTrack = "Java Pro & Cloud Engineering";

        public void displayBranchDetails() {
            System.out.println("  [CHILD BRANCH] Accessing parent members using 'super':");
            // 1. Accessing parent fields via 'super.fieldName'
            System.out.println("  -> Parent Institution: " + super.institutionName);
            System.out.println("  -> Parent Hub Location: " + super.centralHub);

            // 2. Invoking parent methods via 'super.methodName()'
            super.printFoundationInfo();

            System.out.println("  -> Specialized Track: " + this.branchTrack);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: INTRODUCTION TO 'super' KEYWORD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SoftwareEngineeringBranch branch = new SoftwareEngineeringBranch();
        branch.displayBranchDetails();

        System.out.println("\n==========================================================================");
    }
}