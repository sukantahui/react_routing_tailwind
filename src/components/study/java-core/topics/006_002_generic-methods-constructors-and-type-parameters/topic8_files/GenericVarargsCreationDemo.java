/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 8: Varargs with Generics: public static <T> List<T> asList(T... elements)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class GenericVarargsCreationDemo {

    // Generic Varargs Factory Method:
    @SafeVarargs
    public static <T> List<T> createList(T... elements) {
        List<T> list = new ArrayList<>(elements.length);
        for (T item : elements) {
            list.add(item);
        }
        return list;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: GENERIC VARARGS METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Invoking with Strings:
        List<String> trainees = createList("Swadeep Paul", "Tuhina Das", "Abhronila Das");

        // 2. Invoking with Integers:
        List<Integer> rollNumbers = createList(101, 102, 103, 104, 105);

        // 3. Invoking with Doubles:
        List<Double> fees = createList(8500.0, 9200.0, 9800.0);

        System.out.println(">>> 1. Generic Varargs Generated Lists:");
        System.out.println("  Trainees List : " + trainees);
        System.out.println("  Rolls List    : " + rollNumbers);
        System.out.println("  Fees List     : " + fees);

        System.out.println("\n>>> HOW VARARGS WORK INTERNALLY IN THE JVM:");
        System.out.println("  1. Syntactic Sugar: 'T... elements' is translated by the compiler into an array 'T[] elements'.");
        System.out.println("  2. Array Creation: The calling code automatically wraps comma-separated arguments into a newly allocated array.");

        System.out.println("\n==========================================================================");
    }
}