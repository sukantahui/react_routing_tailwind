/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 6: Anonymous Inner Classes vs Lambdas: Bytecode Generation (invokedynamic) & Memory
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

public class AnonymousInnerClassVsLambdaBytecodeDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: ANONYMOUS INNER CLASS vs LAMBDA BYTECODE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Feature           | Anonymous Inner Class             | Lambda Expression (Java 8+)       |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Bytecode / Files  | Generates a separate .class file  | NO separate .class file!          |");
        System.out.println("|                   | (e.g. 'Outer$1.class' on disk)    | Compiled via 'invokedynamic'      |");
        System.out.println("| Object Allocation | 'new Outer$1()' allocated every   | Reused as singleton / CallSite if |");
        System.out.println("|                   | time it is instantiated           | non-capturing (Zero garbage!)     |");
        System.out.println("| 'this' Reference  | Points to the Anonymous Object    | Points to the ENCLOSING class     |");
        System.out.println("| Target Types      | Classes, Abstract Classes,        | SAM Functional Interfaces ONLY    |");
        System.out.println("|                   | Multi-method Interfaces           |                                   |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println();
        System.out.println(">>> THE 'invokedynamic' BYTECODE INSTRUCTION:");
        System.out.println("  - Java 8 lambdas do NOT generate synthetic '$1.class' files.");
        System.out.println("  - Instead, 'javac' emits an 'invokedynamic' (INDY) bytecode instruction linking to 'LambdaMetafactory'.");
        System.out.println("  - The JVM dynamically links and spins an optimized CallSite at runtime with zero disk I/O!");

        System.out.println("\n==========================================================================");
    }
}