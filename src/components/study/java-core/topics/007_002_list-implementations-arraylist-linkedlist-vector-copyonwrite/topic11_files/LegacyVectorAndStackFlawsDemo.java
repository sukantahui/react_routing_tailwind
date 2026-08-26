/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 11: Legacy Classes: java.util.Vector & java.util.Stack (Synchronized Flaws)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Stack;
import java.util.Vector;

public class LegacyVectorAndStackFlawsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: LEGACY Vector & Stack ARCHITECTURAL FLAWS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. LEGACY Vector (Java 1.0): Synchronized on every method!
        Vector<String> legacyVector = new Vector<>();
        legacyVector.add("Legacy Element 1");
        System.out.println(">>> 1. Legacy Vector Content: " + legacyVector);

        // 2. LEGACY Stack (Subclass of Vector - Flawed Inheritance Design!):
        Stack<String> legacyStack = new Stack<>();
        legacyStack.push("Action 1");
        legacyStack.push("Action 2");
        // Flawed inheritance: Stack extends Vector, so you can call vector methods on it!
        legacyStack.add(0, "ILLEGAL ELEMENT INSERTED AT BOTTOM!"); // Violates Stack encapsulation!

        System.out.println("\n>>> 2. Legacy Stack (Inheritance Violation):");
        System.out.println("  Stack after inserting at bottom: " + legacyStack);

        // 3. MODERN REPLACEMENT: ArrayDeque:
        Deque<String> modernStack = new ArrayDeque<>();
        modernStack.push("Action 1");
        modernStack.push("Action 2");
        System.out.println("\n>>> 3. Modern Fast Stack (ArrayDeque):");
        System.out.println("  Popped: " + modernStack.pop());

        System.out.println("\n>>> WHY Vector AND Stack ARE OBSOLETE:");
        System.out.println("  1. Synchronization Overhead : Every method in Vector uses 'synchronized', imposing high lock acquisition penalties even in single-threaded code.");
        System.out.println("  2. Liskov Violation         : Stack extending Vector violates OOP encapsulation by exposing index-based insertion methods (add(0, e)).");
        System.out.println("  3. Modern Replacements      : Use 'ArrayList' (or Collections.synchronizedList) instead of Vector; use 'ArrayDeque' instead of Stack.");

        System.out.println("\n==========================================================================");
    }
}