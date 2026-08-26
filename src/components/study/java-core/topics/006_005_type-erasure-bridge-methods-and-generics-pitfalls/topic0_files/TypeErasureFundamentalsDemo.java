/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 0: How Java Achieves Backward Compatibility: The Type Erasure Compiler Mechanism
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class TypeErasureFundamentalsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: TYPE ERASURE & BACKWARD COMPATIBILITY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentNames = new ArrayList<>();
        List<Integer> rollNumbers = new ArrayList<>();

        System.out.println(">>> 1. Comparing Runtime Classes of Parameterized Collections:");
        System.out.println("  studentNames Class : " + studentNames.getClass().getName());
        System.out.println("  rollNumbers Class  : " + rollNumbers.getClass().getName());
        System.out.println("  Are Runtime Classes Equal? : " + (studentNames.getClass() == rollNumbers.getClass()) + " (Both are raw java.util.ArrayList!)");

        System.out.println("\n>>> WHAT IS TYPE ERASURE?");
        System.out.println("  - Generics were introduced in Java 5 (2004).");
        System.out.println("  - To ensure 100% binary backward compatibility with pre-Java 5 legacy code, generics exist ONLY at compile time.");
        System.out.println("  - The javac compiler checks type safety, then ERASES all generic type arguments (<String>, <Integer>) from bytecode!");
        System.out.println("  - At runtime, the JVM has NO knowledge that 'studentNames' was parameterized with <String>!");

        System.out.println("\n==========================================================================");
    }
}