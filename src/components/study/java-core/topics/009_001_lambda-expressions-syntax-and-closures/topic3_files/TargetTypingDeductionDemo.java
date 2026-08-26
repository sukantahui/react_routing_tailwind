/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 3: Target Typing: How the Java Compiler Infers Lambda Types from Context
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.concurrent.Callable;

public class TargetTypingDeductionDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: TARGET TYPING & CONTEXTUAL INFERENCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS 'TARGET TYPING'?");
        System.out.println("  - A Lambda expression in Java DOES NOT have an explicit type on its own!");
        System.out.println("  - The type is DEDUCED by the Java compiler from the TARGET CONTEXT where it is assigned or passed.");
        System.out.println();

        // 1. SAME LAMBDA EXPRESSION '() -> "Success"' ASSIGNED TO TWO DIFFERENT INTERFACES:

        // Context A: Target Type is 'Callable<String>' (throws Exception, returns String):
        Callable<String> callableTarget = () -> "GST Service Online";

        // Context B: Target Type is 'Supplier<String>' (returns String, no checked exception):
        java.util.function.Supplier<String> supplierTarget = () -> "GST Service Online";

        System.out.println(">>> 1. Evaluated via Callable TargetType: " + callableTarget.call());
        System.out.println(">>> 2. Evaluated via Supplier TargetType: " + supplierTarget.get());

        System.out.println("\n>>> TARGET TYPING CONTEXTS RECOGNIZED BY JAVAC:");
        System.out.println("  - Variable Declarations and Assignments ('TargetType var = lambda;')");
        System.out.println("  - Method Call Arguments ('executor.submit(lambda);')");
        System.out.println("  - Return Statements ('return (x) -> x * 2;')");
        System.out.println("  - Cast Expressions ('((Runnable) () -> doWork()).run();')");

        System.out.println("\n==========================================================================");
    }
}