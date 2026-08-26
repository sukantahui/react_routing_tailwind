/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 1: Compilation Type Replacement: Unbounded (Object) vs Bounded (Upper Bound)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

// 1. Unbounded Generic Class:
class GenericBox<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
    // After Compilation: 'T' is replaced with 'java.lang.Object'!
}

// 2. Bounded Generic Class:
class NumericBox<T extends Number> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
    // After Compilation: 'T' is replaced with its upper bound 'java.lang.Number'!
}

public class TypeReplacementCompilationRulesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: COMPILATION TYPE REPLACEMENT RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW JAVAC REPLACES TYPE PARAMETERS IN BYTECODE:");
        System.out.println("  Case 1: Unbounded '<T>' is replaced with 'java.lang.Object'.");
        System.out.println("          'public void set(T item)' becomes 'public void set(Object item)' in bytecode.");
        System.out.println();
        System.out.println("  Case 2: Bounded '<T extends Number>' is replaced with 'java.lang.Number'.");
        System.out.println("          'public void set(T val)' becomes 'public void set(Number val)' in bytecode.");
        System.out.println();
        System.out.println("  Case 3: Multiple Bounds '<T extends Number & Comparable<T>>' is replaced with the FIRST bound ('Number').");

        System.out.println("\n==========================================================================");
    }
}