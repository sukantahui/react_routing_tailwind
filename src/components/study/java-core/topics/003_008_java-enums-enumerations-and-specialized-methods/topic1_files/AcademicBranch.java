/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 1: The 'enum' Keyword: Creating Type-Safe Enumeration Types & Constants
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

// Declaring a top-level or nested type-safe enum:
public enum AcademicBranch {
    BARRACKPORE,
    NAIHATI,
    SHYAMNAGAR,
    ICHAPUR
}

class BranchUsageDemo {

    public static void printBranchInfo(AcademicBranch branch) {
        System.out.println("  Selected Training Hub: " + branch);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 'enum' KEYWORD FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademicBranch primaryCenter = AcademicBranch.BARRACKPORE;
        AcademicBranch extensionCenter = AcademicBranch.NAIHATI;

        System.out.println(">>> 1. Utilizing Type-Safe Enum Constants:");
        printBranchInfo(primaryCenter);
        printBranchInfo(extensionCenter);

        System.out.println("\n>>> 2. Enum Reference Identity (== vs equals):");
        // Because enums are strictly singleton constants, '==' is always 100% safe and preferred!
        boolean isSame = (primaryCenter == AcademicBranch.BARRACKPORE);
        System.out.println("  primaryCenter == AcademicBranch.BARRACKPORE? " + isSame);

        System.out.println("\n==========================================================================");
    }
}