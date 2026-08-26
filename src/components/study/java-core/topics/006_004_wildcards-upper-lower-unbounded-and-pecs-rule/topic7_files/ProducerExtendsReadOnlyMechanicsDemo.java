/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 7: ? extends T is READ-ONLY (Producer Role Mechanics)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class ProducerExtendsReadOnlyMechanicsDemo {

    // PRODUCER: It PRODUCES (provides) elements of type 'Number' to our algorithm:
    public static double computeTotalExpense(List<? extends Number> expenseLedger) {
        double total = 0.0;
        // READING is 100% legal:
        for (Number expense : expenseLedger) {
            total += expense.doubleValue();
        }

        // WRITING IS FORBIDDEN:
        // expenseLedger.add(500); // COMPILATION ERROR: Cannot add Integer to List<? extends Number>!
        // expenseLedger.add(100.50); // COMPILATION ERROR: Cannot add Double to List<? extends Number>!

        return total;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: PRODUCER EXTENDS (READ-ONLY) MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> bkpExpenses = List.of(1200, 3500, 4800);
        List<Double> naihatiExpenses = List.of(2450.75, 1890.25, 950.00);

        System.out.printf(">>> Barrackpore Total Expenses: ₹%.2f%n", computeTotalExpense(bkpExpenses));
        System.out.printf(">>> Naihati Total Expenses    : ₹%.2f%n", computeTotalExpense(naihatiExpenses));

        System.out.println("\n>>> WHY PRODUCER EXTENDS IS STRICTLY READ-ONLY:");
        System.out.println("  1. The collection acts as a data supplier / source.");
        System.out.println("  2. If the caller passed a 'List<Double>', attempting to add an 'Integer' would corrupt heap memory.");
        System.out.println("  3. The compiler enforces read-only immutability to guarantee type safety.");

        System.out.println("\n==========================================================================");
    }
}