/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 11: Restriction 6: No Parameterized Exception Classes (Cannot Catch/Throw T)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

// ILLEGAL SYNTAX (Will NOT compile):
// class GenericCustomException<T> extends Exception { } // COMPILE ERROR: A generic class may not extend java.lang.Throwable!

public class Restriction6NoGenericExceptionsDemo {

    // LEGAL: Type variable in throws clause (Type Erasure replaces T with Exception bound):
    public static <T extends Exception> void executeWithPossibleException(boolean trigger, T ex) throws T {
        if (trigger) {
            throw ex; // LEGAL: Can throw an instance of a generic exception parameter!
        }
        System.out.println("  Execution successful, no exception thrown.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: RESTRICTION 6 - NO GENERIC EXCEPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHY GENERIC EXCEPTION CLASSES ARE PROHIBITED:");
        System.out.println("  - 'class MyException<T> extends Exception' is illegal.");
        System.out.println("  - Catch clauses: 'catch (MyException<String> e)' is impossible because the JVM catch mechanism operates entirely at runtime.");
        System.out.println("  - At runtime, type erasure strips <String>, so 'catch (MyException<String>)' and 'catch (MyException<Integer>)' would be identical!");

        System.out.println("\n>>> 2. WHAT IS PERMITTED (Generic throws clause):");
        try {
            executeWithPossibleException(false, new IllegalArgumentException("Invalid data!"));
        } catch (Exception e) {
            System.out.println("  Caught: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}