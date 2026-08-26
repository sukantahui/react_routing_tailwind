/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 7: Lexical Scoping: What 'this' and 'super' Point to Inside a Lambda Expression
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

public class LambdaLexicalScopingScopeDemo {

    private final String locationName = "Barrackpore Central Hub";

    public void demonstrateLexicalThis() {
        // 1. In Anonymous Inner Class: 'this' refers to the ANONYMOUS class instance:
        Runnable anonRunnable = new Runnable() {
            private final String locationName = "Anonymous Inner Scope";

            @Override
            public void run() {
                System.out.println(">>> 1. Anonymous 'this.locationName': " + this.locationName); // Prints "Anonymous Inner Scope"
            }
        };
        anonRunnable.run();

        // 2. In Lambda Expression: 'this' refers to the ENCLOSING outer instance (Lexical Scoping):
        Runnable lambdaRunnable = () -> {
            // Lambdas do NOT introduce a new 'this' scope!
            System.out.println(">>> 2. Lambda 'this.locationName'   : " + this.locationName); // Prints "Barrackpore Central Hub"
        };
        lambdaRunnable.run();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: LEXICAL SCOPING & 'this' BINDING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        new LambdaLexicalScopingScopeDemo().demonstrateLexicalThis();

        System.out.println("\n>>> LEXICAL SCOPING RULE (Brian Goetz):");
        System.out.println("  - A Lambda expression is LEXICALLY SCOPED.");
        System.out.println("  - It does NOT hide (shadow) variables from the enclosing scope.");
        System.out.println("  - 'this' and 'super' in a lambda have the EXACT SAME meaning as they do outside the lambda!");

        System.out.println("\n==========================================================================");
    }
}