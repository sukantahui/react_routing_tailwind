/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 0: What is a Method Reference? Ultra-Compact Syntactic Sugar for Lambdas
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Consumer;

public class WhatIsMethodReferenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS A METHOD REFERENCE? - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentNames = List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das");

        // 1. Standard Lambda Expression (Pass-through forwarding):
        Consumer<String> lambdaPrinter = s -> System.out.println(s);
        System.out.println(">>> 1. Printed via Standard Lambda:");
        studentNames.forEach(lambdaPrinter);

        // 2. Method Reference Equivalent (Ultra-compact & Clean):
        Consumer<String> methodRefPrinter = System.out::println;
        System.out.println("\n>>> 2. Printed via Method Reference (System.out::println):");
        studentNames.forEach(methodRefPrinter);

        System.out.println("\n>>> CORE DEFINITION:");
        System.out.println("  - A Method Reference is syntactic sugar for a lambda expression that does NOTHING EXCEPT call an already existing method by name.");
        System.out.println("  - It eliminates redundant parameter declarations ('s -> ... (s)').");

        System.out.println("\n==========================================================================");
    }
}