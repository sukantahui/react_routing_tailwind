/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 6: The Default Package and Why Production Code Must Never Use It
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class DefaultPackageRisksDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE DEFAULT PACKAGE & PRODUCTION HAZARDS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> What is the 'Default Package'?");
        System.out.println("  - When a .java file omits the 'package' statement entirely, it belongs to the unnamed 'default package'.");
        System.out.println();
        System.out.println(">>> 4 Critical Reasons Why Production Code Must NEVER Use the Default Package:");
        System.out.println("  1. UNIMPORTABLE: Classes inside named packages CANNOT import classes from the default package!");
        System.out.println("  2. COLLISION RISK: Instant name clashes in enterprise JAR dependencies.");
        System.out.println("  3. JPMS INCOMPATIBILITY: Java 9+ Modules strictly forbid exporting the default package.");
        System.out.println("  4. FRAMEWORK FAILURES: Spring Boot, Hibernate, and JPA scanner tools require named packages.");

        System.out.println("\n==========================================================================");
    }
}