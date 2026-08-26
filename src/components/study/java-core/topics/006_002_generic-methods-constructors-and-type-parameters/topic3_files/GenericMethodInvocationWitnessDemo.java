/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 3: Invoking Generic Methods: Explicit Witness Syntax vs Compiler Type Inference
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class GenericMethodInvocationWitnessDemo {

    public static <T> T coalesce(T first, T fallback) {
        return first != null ? first : fallback;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: EXPLICIT TYPE WITNESS VS TYPE INFERENCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String primaryHub = null;
        String backupHub = "Barrackpore Central Hub";

        // 1. INFERRED INVOCATION (Modern Java Standard):
        // Compiler automatically infers T = String from arguments!
        String resolvedInferred = coalesce(primaryHub, backupHub);
        System.out.println(">>> 1. Inferred Generic Method Invocation:");
        System.out.println("  Resolved Hub (Inferred) : " + resolvedInferred);

        // 2. EXPLICIT TYPE WITNESS INVOCATION:
        // Explicitly specifying the type argument before the method name:
        String resolvedExplicit = GenericMethodInvocationWitnessDemo.<String>coalesce(primaryHub, backupHub);
        Number resolvedNumber = GenericMethodInvocationWitnessDemo.<Number>coalesce(10.5, 20);

        System.out.println("\n>>> 2. Explicit Type Witness (<Type>methodName):");
        System.out.println("  Resolved Hub (Explicit) : " + resolvedExplicit);
        System.out.println("  Resolved Number (<Number>): " + resolvedNumber);

        System.out.println("\n>>> WHEN EXPLICIT TYPE WITNESSES ARE REQUIRED:");
        System.out.println("  1. Disambiguating Overloads: When multiple overloaded generic methods match.");
        System.out.println("  2. Common Supertype Forcing: Forcing T = Number when mixing Integer and Double args.");
        System.out.println("  3. Empty Collections: E.g., 'Collections.<String>emptyList()'.");

        System.out.println("\n==========================================================================");
    }
}