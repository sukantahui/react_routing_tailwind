/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 6: Why float and double Must NEVER Be Used for Financial Calculations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

public class FinancialDoubleDisasterSimulationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: FINANCIAL DOUBLE DISASTER SIMULATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Scenario: A student starts with ₹1.00 and buys items costing ₹0.10 ten times:");

        // Simulation with primitive double:
        double balance = 1.00;
        int itemsBought = 0;

        for (double price = 0.10; balance >= price; balance -= price) {
            itemsBought++;
        }

        System.out.println("  Items Purchased : " + itemsBought + " items (Expected: 10 items!)");
        System.out.println("  Remaining Fund  : ₹" + balance + " (Lost money due to roundoff error!)");

        System.out.println("\n>>> THE LESSON: After 9 purchases, balance became 0.09999999999999995,");
        System.out.println("    which is LESS than 0.10, falsely preventing the 10th purchase!");
        System.out.println("    In banking and AccoTax ledgers, this causes audits to fail and millions in losses.");

        System.out.println("\n==========================================================================");
    }
}