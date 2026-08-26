/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 5: Lower Bounded Wildcard (List<? super Integer>): Contravariance & Insertion
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class LowerBoundedWildcardContravarianceDemo {

    // Lower Bounded Wildcard Method (Contravariance):
    // Accepts List<Integer>, List<Number>, List<Object>!
    public static void populateRollNumbers(List<? super Integer> destination) {
        // WRITE-ENABLED: Safe to insert Integer and any subtype of Integer!
        destination.add(101);
        destination.add(102);
        destination.add(103);
        System.out.println("  [INSERTED] Added 3 roll numbers into consumer list.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: LOWER BOUNDED WILDCARD (List<? super Integer>) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> integerList = new ArrayList<>();
        List<Number> numberList = new ArrayList<>();
        List<Object> objectList = new ArrayList<>();

        System.out.println(">>> 1. Populating Integer List (List<Integer>):");
        populateRollNumbers(integerList);
        System.out.println("  Integer List Content : " + integerList);

        System.out.println("\n>>> 2. Populating Number List (List<Number>):");
        populateRollNumbers(numberList);
        System.out.println("  Number List Content  : " + numberList);

        System.out.println("\n>>> 3. Populating Object List (List<Object>):");
        populateRollNumbers(objectList);
        System.out.println("  Object List Content  : " + objectList);

        System.out.println("\n>>> WHAT IS CONTRAVARIANCE IN GENERICS?");
        System.out.println("  1. 'List<? super Integer>' creates a CONTRAVARIANT subtyping relationship.");
        System.out.println("  2. 'List<Number>' and 'List<Object>' ARE considered subtypes of 'List<? super Integer>'!");
        System.out.println("  3. Write-Enabled for Integer, but elements can ONLY be read as 'Object'.");

        System.out.println("\n==========================================================================");
    }
}