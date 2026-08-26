/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 3: Autoboxing: Automatic Primitive to Wrapper Object Conversion
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class AutoboxingFoundationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: AUTOBOXING FOUNDATIONS (JAVA 5+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int primitiveAge = 22;

        // 1. Explicit Boxing (Legacy Java 1.4 syntax - Deprecated constructor!):
        // Integer legacyBoxed = new Integer(primitiveAge); // DON'T USE!

        // 2. Modern AUTOBOXING (Introduced in Java 5):
        // Compiler automatically converts primitive 'int' into 'Integer' object!
        Integer modernBoxed = primitiveAge;

        System.out.println(">>> 1. Autoboxed Variable State:");
        System.out.println("  primitiveAge : " + primitiveAge + " (int on Stack)");
        System.out.println("  modernBoxed  : " + modernBoxed + " (Integer on Heap)");

        System.out.println("\n>>> 2. What the Java Compiler Actually Generates in Bytecode:");
        System.out.println("  Source Code : Integer x = 42;");
        System.out.println("  Bytecode    : Integer x = Integer.valueOf(42);");

        System.out.println("\n==========================================================================");
    }
}