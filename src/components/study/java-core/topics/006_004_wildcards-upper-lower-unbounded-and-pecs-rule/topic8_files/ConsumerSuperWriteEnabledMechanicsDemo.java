/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 8: ? super T is WRITE-ENABLED (Consumer Role Mechanics)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class ConsumerSuperWriteEnabledMechanicsDemo {

    // CONSUMER: It CONSUMES (receives/stores) elements of type 'Integer':
    public static void generatePrimeTokens(List<? super Integer> destinationSink, int count) {
        int candidate = 2;
        int found = 0;
        while (found < count) {
            if (isPrime(candidate)) {
                destinationSink.add(candidate); // WRITING IS 100% LEGAL!
                found++;
            }
            candidate++;
        }
    }

    private static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CONSUMER SUPER (WRITE-ENABLED) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> intList = new ArrayList<>();
        List<Number> numList = new ArrayList<>();
        List<Object> objList = new ArrayList<>();

        // Invoking consumer with diverse supertype sinks:
        generatePrimeTokens(intList, 5);
        generatePrimeTokens(numList, 5);
        generatePrimeTokens(objList, 5);

        System.out.println(">>> 1. Prime Tokens Written to Diverse Sinks:");
        System.out.println("  List<Integer> Sink : " + intList);
        System.out.println("  List<Number> Sink  : " + numList);
        System.out.println("  List<Object> Sink  : " + objList);

        System.out.println("\n>>> WHY CONSUMER SUPER IS WRITE-ENABLED:");
        System.out.println("  1. 'List<? super Integer>' accepts any list capable of holding Integers (Integer, Number, Object).");
        System.out.println("  2. Inserting an 'Integer' into a List of Numbers or Objects is ALWAYS type-safe.");

        System.out.println("\n==========================================================================");
    }
}