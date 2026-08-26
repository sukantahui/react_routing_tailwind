/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 9: Common Standard Java Exceptions Catalog: Triggers & Defensive Preventions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class CommonStandardExceptionsCatalogDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: COMMON JAVA EXCEPTIONS CATALOG - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+---------------------------------------+-----------+-----------------------------------------------+");
        System.out.println("| Exception Name                        | Type      | Root Trigger Cause                            |");
        System.out.println("+---------------------------------------+-----------+-----------------------------------------------+");
        System.out.println("| NullPointerException (NPE)            | Unchecked | Calling method/field on null reference        |");
        System.out.println("| ArrayIndexOutOfBoundsException        | Unchecked | Accessing array with negative or excessive index|");
        System.out.println("| ClassCastException                    | Unchecked | Casting object to incompatible subtype        |");
        System.out.println("| IllegalArgumentException              | Unchecked | Method received inappropriate parameter       |");
        System.out.println("| IllegalStateException                 | Unchecked | Object invoked in unsuitable lifecycle state  |");
        System.out.println("| NumberFormatException                 | Unchecked | Parsing non-numeric string into number        |");
        System.out.println("| IOException                           | Checked   | File, network, or stream communication failure|");
        System.out.println("| SQLException                          | Checked   | Database syntax, connection or query error    |");
        System.out.println("| ClassNotFoundException                | Checked   | JVM failed to load dynamic class by name      |");
        System.out.println("+---------------------------------------+-----------+-----------------------------------------------+");

        // Demonstration of ClassCastException:
        try {
            Object text = "Barrackpore Training Center";
            Integer num = (Integer) text; // Invalid downcast!
        } catch (ClassCastException e) {
            System.out.println("\n>>> Caught ClassCastException: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}