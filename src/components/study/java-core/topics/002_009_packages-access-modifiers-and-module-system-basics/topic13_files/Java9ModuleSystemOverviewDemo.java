/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 13: Introduction to Java 9 Platform Module System (JPMS / Project Jigsaw)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class Java9ModuleSystemOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: JAVA 9 MODULE SYSTEM (JPMS / PROJECT JIGSAW) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 3 Historical Problems of Classpath (Before Java 9):");
        System.out.println("  1. 'JAR HELL' / Classpath Hell: Silent runtime NoClassDefFoundError crashes.");
        System.out.println("  2. Weak Encapsulation: If a class was 'public', every JAR on classpath could access its internals!");
        System.out.println("  3. Monolithic rt.jar: JDK runtime was huge (60MB+), impossible to run on small IoT devices.");
        System.out.println();
        System.out.println(">>> The Java 9 JPMS Solution (Project Jigsaw):");
        System.out.println("  ✔ Modular JDK: JDK split into ~90 modular chunks (java.base, java.sql, java.net.http, etc.).");
        System.out.println("  ✔ Reliable Configuration: Missing dependencies are caught during STARTUP, not runtime.");
        System.out.println("  ✔ Strong Encapsulation: Public classes are HIDDEN unless explicitly exported in 'module-info.java'!");
        System.out.println("  ✔ Custom JREs: Create ultra-lightweight 20MB microservice images using 'jlink' tool!");

        System.out.println("\n==========================================================================");
    }
}