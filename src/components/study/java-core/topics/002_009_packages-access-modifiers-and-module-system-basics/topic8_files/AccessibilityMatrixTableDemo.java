/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 8: Accessibility Matrix Table: Complete Scope Permutations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class AccessibilityMatrixTableDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: JAVA ACCESS MODIFIERS ACCESSIBILITY MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+---------------------------------+---------+---------+-----------+--------+");
        System.out.println("| Location / Relationship         | private | default | protected | public |");
        System.out.println("+---------------------------------+---------+---------+-----------+--------+");
        System.out.println("| Same Class                      |   YES   |   YES   |    YES    |  YES   |");
        System.out.println("| Same Package Subclass           |   NO    |   YES   |    YES    |  YES   |");
        System.out.println("| Same Package Non-Subclass       |   NO    |   YES   |    YES    |  YES   |");
        System.out.println("| Different Package Subclass      |   NO    |   NO    |    YES    |  YES   |");
        System.out.println("| Different Package Non-Subclass  |   NO    |   NO    |    NO     |  YES   |");
        System.out.println("+---------------------------------+---------+---------+-----------+--------+");

        System.out.println("\n>>> Crucial Observations:");
        System.out.println("  1. 'private' is strictly restricted to the enclosing top-level/inner class.");
        System.out.println("  2. 'default' (no modifier) stops right at the package boundary.");
        System.out.println("  3. 'protected' crosses the package boundary ONLY through INHERITANCE.");
        System.out.println("  4. 'public' has zero boundary restrictions.");

        System.out.println("\n==========================================================================");
    }
}