/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 8: Instance Variables and Constants in Abstract Classes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractFieldsAndConstantsDemo {

    public abstract static class BaseAcademyNode {
        // 1. Static Constant (Universal institutional constant)
        public static final String ACADEMY_AFFILIATION = "Coder & AccoTax Barrackpore";

        // 2. Mutable Instance Variables (Inherited by all child instances)
        protected String centerBranch;
        protected double centerOperatingBudget;

        public BaseAcademyNode(String branch, double budget) {
            this.centerBranch = branch;
            this.centerOperatingBudget = budget;
        }

        public abstract void renderCampusStatus();
    }

    public static class RegionalLabNode extends BaseAcademyNode {
        private int activeTerminals;

        public RegionalLabNode(String branch, double budget, int terminals) {
            super(branch, budget);
            this.activeTerminals = terminals;
        }

        @Override
        public void renderCampusStatus() {
            System.out.printf("  [CAMPUS] %s | Hub: %s | Budget: ₹%.2f | Terminals: %d\n",
                    ACADEMY_AFFILIATION, centerBranch, centerOperatingBudget, activeTerminals);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: FIELDS & CONSTANTS IN ABSTRACT CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BaseAcademyNode lab = new RegionalLabNode("Barrackpore Central Lab", 150000.0, 45);
        lab.renderCampusStatus();

        System.out.println("\n==========================================================================");
    }
}