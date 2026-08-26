/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 10: Enums Implementing Interfaces: Extensible Enums & Strategy Pattern
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

// Common Interface:
interface TaxAssessmentStrategy {
    double computeTax(double taxableIncome);
}

// Enum implementing interface for Indian Income Tax Regimes:
public enum IncomeTaxRegime implements TaxAssessmentStrategy {
    OLD_REGIME {
        @Override
        public double computeTax(double taxableIncome) {
            // Allows 80C deductions, higher progressive slab rate:
            return taxableIncome * 0.20;
        }
    },
    NEW_REGIME {
        @Override
        public double computeTax(double taxableIncome) {
            // Lower progressive rate, no 80C deductions:
            return taxableIncome * 0.15;
        }
    };

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: ENUMS IMPLEMENTING INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double traineeIncome = 800000.0; // 8 Lakhs INR

        System.out.println(">>> Calculating Tax via Polymorphic TaxAssessmentStrategy Interface:");
        for (TaxAssessmentStrategy strategy : IncomeTaxRegime.values()) {
            double tax = strategy.computeTax(traineeIncome);
            System.out.printf("  %s -> Tax Payable: %.2f INR%n", strategy, tax);
        }

        System.out.println("\n>>> EXTENSIBLE STRATEGY PATTERN:");
        System.out.println("  By implementing interfaces, enums can be passed polymorphically to any method expecting that interface!");

        System.out.println("\n==========================================================================");
    }
}