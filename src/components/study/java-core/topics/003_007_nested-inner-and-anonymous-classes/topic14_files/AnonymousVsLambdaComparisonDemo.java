/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 14: Comparing Anonymous Inner Classes vs Java 8 Lambdas (Architecture & 'this' Scope)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class AnonymousVsLambdaComparisonDemo {

    private String scopeOrigin = "Enclosing Outer Class Scope";

    public void testScopes() {

        // 1. Anonymous Inner Class ('this' refers to the ANONYMOUS CLASS INSTANCE itself):
        Runnable anonRunnable = new Runnable() {
            private String scopeOrigin = "Anonymous Class Scope";

            @Override
            public void run() {
                System.out.println("  1. Anonymous Class 'this': " + this.scopeOrigin);
                System.out.println("     Outer Scope Reference : " + AnonymousVsLambdaComparisonDemo.this.scopeOrigin);
            }
        };
        anonRunnable.run();

        // 2. Java 8 Lambda Expression ('this' refers to the ENCLOSING CLASS INSTANCE - Lexical Scoping):
        Runnable lambdaRunnable = () -> {
            // In a lambda, 'this' refers directly to the enclosing outer object!
            System.out.println("  2. Lambda Expression 'this': " + this.scopeOrigin);
        };
        lambdaRunnable.run();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: ANONYMOUS CLASSES vs JAVA 8 LAMBDAS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 Key Architectural Differences:");
        System.out.println("  1. 'this' Scope: In anonymous classes, 'this' is the inner object; in lambdas, 'this' is lexical (outer object).");
        System.out.println("  2. Class Generation: Anonymous creates 'Outer$1.class'; Lambda uses 'invokedynamic' (no .class file).");
        System.out.println("  3. Target Types: Anonymous can extend classes and multi-method interfaces; Lambda works ONLY with Functional Interfaces (SAM).");

        System.out.println("\n>>> Executing Scope Comparison Demo:");
        new AnonymousVsLambdaComparisonDemo().testScopes();

        System.out.println("\n==========================================================================");
    }
}