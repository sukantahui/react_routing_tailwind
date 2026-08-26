/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 15: Comprehensive Comparison Table: 'this' vs 'super'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class ThisVsSuperComprehensiveComparisonDemo {

    public static class ParentEntity {
        protected String type = "Parent";
        public void execute() { System.out.println("  [PARENT] execute()"); }
    }

    public static class ChildEntity extends ParentEntity {
        protected String type = "Child";

        public ChildEntity() {
            super(); // Calls parent constructor
        }

        public ChildEntity(String customType) {
            this(); // Calls peer constructor
            this.type = customType;
        }

        @Override
        public void execute() {
            System.out.println("  [CHILD] execute()");
        }

        public void demonstrateComparison() {
            System.out.println("  -> this.type:  " + this.type);  // Child field
            System.out.println("  -> super.type: " + super.type); // Parent field
            this.execute();  // Child method
            super.execute(); // Parent method
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: 'this' VS 'super' COMPLETE COMPARISON MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ChildEntity entity = new ChildEntity("Specialized Trainee");
        entity.demonstrateComparison();

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_003 THE 'this' & 'super' KEYWORDS MASTERY 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}