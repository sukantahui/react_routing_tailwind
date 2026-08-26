/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 7: Exception Handling Rules in Overriding: Checked Exceptions Constraints
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

import java.io.FileNotFoundException;
import java.io.IOException;

public class ExceptionHandlingOverridingRulesDemo {

    public static class BaseFileStorage {
        // Parent method declares checked IOException
        public void loadConfigFile() throws IOException {
            System.out.println("  [BASE] Loading configuration file...");
        }
    }

    public static class LocalStorage extends BaseFileStorage {
        // RULE 1 (VALID): Child can throw NARROWER checked exception (FileNotFoundException IS-A IOException):
        @Override
        public void loadConfigFile() throws FileNotFoundException {
            System.out.println("  [LOCAL CHILD] Loading local file (throws FileNotFoundException).");
        }

        // RULE 2 (VALID): Child can choose to throw NO checked exception at all!
        // RULE 3 (VALID): Child can throw ANY Unchecked (RuntimeException) exceptions.
        // RULE 4 (ILLEGAL): Child CANNOT throw a BROADER checked exception (e.g. throws Exception)!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: EXCEPTION HANDLING RULES IN OVERRIDING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BaseFileStorage storage = new LocalStorage();
        try {
            storage.loadConfigFile();
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("\n>>> Summary of Checked Exception Overriding Laws:");
        System.out.println("  1. Child can throw FEWER or NARROWER checked exceptions.");
        System.out.println("  2. Child CANNOT declare NEW or BROADER checked exceptions.");
        System.out.println("  3. Unchecked exceptions (NullPointerException, etc.) have zero restrictions.");

        System.out.println("\n==========================================================================");
    }
}