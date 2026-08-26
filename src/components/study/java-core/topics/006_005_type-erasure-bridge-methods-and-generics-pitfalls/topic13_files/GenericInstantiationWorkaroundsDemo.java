/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 13: Workarounds for Generic Instantiation: Class<T> Type Tokens & Factories
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.function.Supplier;

public class GenericInstantiationWorkaroundsDemo {

    // WORKAROUND 1: Dynamic Array Creation via Class<T> Type Token:
    @SuppressWarnings("unchecked")
    public static <T> T[] createGenericArray(Class<T> clazz, int capacity) {
        // Uses java.lang.reflect.Array.newInstance to allocate reified typed array at runtime:
        return (T[]) Array.newInstance(clazz, capacity);
    }

    // WORKAROUND 2: Object Creation via Java 8 Supplier<T> Functional Interface:
    public static <T> T createInstance(Supplier<T> factory) {
        return factory.get();
    }

    public static class StudentAccount {
        private final String center = "Barrackpore Academy";
        public String getCenter() { return center; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: GENERIC INSTANTIATION WORKAROUNDS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Creating Generic Array Dynamically:
        String[] branchArray = createGenericArray(String.class, 3);
        branchArray[0] = "Barrackpore";
        branchArray[1] = "Naihati";
        branchArray[2] = "Shyamnagar";
        System.out.println(">>> 1. Dynamically Instantiated Generic Array via Class<T>:");
        System.out.println("  Array: " + Arrays.toString(branchArray));
        System.out.println("  Runtime Component Type: " + branchArray.getClass().getComponentType().getSimpleName());

        // 2. Creating Generic Instance via Supplier:
        StudentAccount acc = createInstance(StudentAccount::new);
        System.out.println("\n>>> 2. Dynamically Instantiated Object via Supplier<T>:");
        System.out.println("  Center: " + acc.getCenter());

        System.out.println("\n==========================================================================");
    }
}