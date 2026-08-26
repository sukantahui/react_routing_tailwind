/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 1: The Java Exception Hierarchy: java.lang.Throwable, Error & Exception
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ThrowableHierarchyTaxonomyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE java.lang.Throwable HIERARCHY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE COMPLETE JAVA EXCEPTION HIERARCHY TREE:");
        System.out.println();
        System.out.println("                     Object");
        System.out.println("                        |");
        System.out.println("                java.lang.Throwable  (Root of all errors & exceptions)");
        System.out.println("                   /          \\");
        System.out.println("                  /            \\");
        System.out.println("         java.lang.Error    java.lang.Exception");
        System.out.println("          (Fatal JVM faults)       /         \\");
        System.out.println("                                  /           \\");
        System.out.println("                         CHECKED EXCEPTIONS   RuntimeException");
        System.out.println("                         (IOException,         (UNCHECKED)");
        System.out.println("                          SQLException, etc.)  (NullPointerException,");
        System.out.println("                                                ArithmeticException)");

        System.out.println("\n>>> 3 CORE HIERARCHY RULES:");
        System.out.println("  1. ONLY subclasses of 'Throwable' can be thrown ('throw') or caught ('catch').");
        System.out.println("  2. 'Error' represents catastrophic JVM-level failures that applications should NEVER catch.");
        System.out.println("  3. 'Exception' represents recoverable conditions that applications CAN and SHOULD handle.");

        System.out.println("\n==========================================================================");
    }
}