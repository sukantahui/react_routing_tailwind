/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 2: Reverse Domain Name Package Naming Convention
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class ReverseDomainNamingConventionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: REVERSE DOMAIN NAME PACKAGE CONVENTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Why Java Uses Reverse Domain Names (e.g. com.company.project.module):");
        System.out.println("  1. Global Uniqueness: Internet domain names (like coderaccotax.com) are globally registered.");
        System.out.println("  2. Standard Hierarchical Breakdown:");
        System.out.println("     - 'com'                  -> Top-Level Domain (TLD)");
        System.out.println("     - 'coderaccotax'         -> Organization Name");
        System.out.println("     - 'academy'              -> Product / Department");
        System.out.println("     - 'admissions'           -> Specific Functional Layer / Subsystem");
        System.out.println();
        System.out.println("  3. Naming Rules & Conventions:");
        System.out.println("     ✔ Always all LOWERCASE (e.g. 'com.coderaccotax', NOT 'com.CoderAccoTax')");
        System.out.println("     ✔ Cannot contain Java keywords (e.g. 'com.coderaccotax.int' -> ILLEGAL!)");
        System.out.println("     ✔ Replace hyphens with underscores if necessary.");

        System.out.println("\n==========================================================================");
    }
}