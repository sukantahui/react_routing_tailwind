/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 1: Generic Method Syntax Breakdown: <T, R> Return Types & Parameter Lists
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class GenericMethodSyntaxBreakdownDemo {

    // 1. Single Type Parameter with Return Value:
    public static <T> T identity(T input) {
        return input;
    }

    // 2. Multiple Type Parameters with Transformation:
    public static <K, V> String formatPair(K key, V value) {
        return "[" + key.toString() + " => " + value.toString() + "]";
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: GENERIC METHOD SYNTAX RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Calling single type parameter generic method:
        String trainee = identity("Tuhina Das (Naihati)");
        Integer score = identity(99);

        System.out.println(">>> 1. Identity Generic Returns:");
        System.out.println("  String  : " + trainee);
        System.out.println("  Integer : " + score);

        // 2. Calling multi-type parameter generic method:
        System.out.println("\n>>> 2. Multi-Type Generic Pair Formatter:");
        String pair1 = formatPair("ROLL_101", "Swadeep Paul");
        String pair2 = formatPair(102, 9850.50);
        String pair3 = formatPair("BARRACKPORE_HUB", true);

        System.out.println("  Pair 1 : " + pair1);
        System.out.println("  Pair 2 : " + pair2);
        System.out.println("  Pair 3 : " + pair3);

        System.out.println("\n>>> SYNTAX RULES:");
        System.out.println("  1. '<T>' must appear IMMEDIATELY BEFORE the return type.");
        System.out.println("  2. Multiple parameters are comma-separated: '<K, V, R>'.");
        System.out.println("  3. The return type can use 'T', 'void', or any concrete class.");

        System.out.println("\n==========================================================================");
    }
}