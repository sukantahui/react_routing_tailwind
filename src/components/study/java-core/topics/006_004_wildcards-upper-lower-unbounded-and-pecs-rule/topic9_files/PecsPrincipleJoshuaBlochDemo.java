/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 9: Joshua Bloch's PECS Principle: "Producer Extends, Consumer Super"
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class PecsPrincipleJoshuaBlochDemo {

    // THE GOLD STANDARD PECS METHOD:
    // 'src' is a PRODUCER (we read T from it) -> <? extends T>
    // 'dest' is a CONSUMER (we write T into it) -> <? super T>
    public static <T> void copyElements(List<? super T> dest, List<? extends T> src) {
        for (T item : src) {
            dest.add(item); // Reads from src (Producer) and writes to dest (Consumer)!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: JOSHUA BLOCH'S PECS PRINCIPLE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Producer: List of specific Integers:
        List<Integer> integerSource = List.of(10, 20, 30, 40);

        // Consumer: List of broad Numbers:
        List<Number> numberDestination = new ArrayList<>();

        System.out.println(">>> 1. Copying from List<Integer> to List<Number> via PECS:");
        copyElements(numberDestination, integerSource);
        System.out.println("  Destination List Content : " + numberDestination);

        // Consumer: List of universal Objects:
        List<Object> objectDestination = new ArrayList<>();
        copyElements(objectDestination, integerSource);
        System.out.println("  Object Destination Content: " + objectDestination);

        System.out.println("\n>>> JOSHUA BLOCH'S PECS MNEMONIC (Effective Java Item 31):");
        System.out.println("  P - Producer");
        System.out.println("  E - Extends  (Use '? extends T' when reading data from a parameter)");
        System.out.println("  C - Consumer");
        System.out.println("  S - Super    (Use '? super T' when writing data into a parameter)");

        System.out.println("\n==========================================================================");
    }
}