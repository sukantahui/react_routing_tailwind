/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 10: Deconstructing java.util.Collections.copy() using PECS Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsCopyPecsDeconstructionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: DECONSTRUCTING Collections.copy() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Source list (Producer of Integers):
        List<Integer> integerSource = List.of(101, 102, 103, 104);

        // Destination list (Consumer capable of holding Numbers):
        List<Number> numberDestination = new ArrayList<>(Collections.nCopies(4, 0));

        System.out.println(">>> 1. State Before Collections.copy():");
        System.out.println("  Source (List<Integer>) : " + integerSource);
        System.out.println("  Dest   (List<Number>)  : " + numberDestination);

        // Invoking JDK java.util.Collections.copy():
        // Signature: public static <T> void copy(List<? super T> dest, List<? extends T> src)
        Collections.copy(numberDestination, integerSource);

        System.out.println("\n>>> 2. State After Collections.copy():");
        System.out.println("  Dest (Copied Numbers)  : " + numberDestination);

        System.out.println("\n>>> ARCHITECTURAL BREAKDOWN OF Collections.copy():");
        System.out.println("  - 'src' is 'List<? extends T>': Acts as a Producer. Can pass List<Integer> when T=Number.");
        System.out.println("  - 'dest' is 'List<? super T>': Acts as a Consumer. Can pass List<Number> or List<Object>.");
        System.out.println("  - Without PECS wildcards, Collections.copy would require EXACT identical type matches (e.g. List<T> to List<T>), breaking flexibility!");

        System.out.println("\n==========================================================================");
    }
}