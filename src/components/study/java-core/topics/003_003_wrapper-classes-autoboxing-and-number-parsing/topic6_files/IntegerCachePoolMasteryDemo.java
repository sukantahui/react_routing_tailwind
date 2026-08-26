/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 6: The Integer Cache Pool (-128 to 127): Why 100 == 100 is True, but 200 == 200 is False
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class IntegerCachePoolMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE INTEGER CACHE POOL (-128 to 127) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Values WITHIN the cache range [-128 to 127]:
        Integer a = 100; // Translates to Integer.valueOf(100) -> Fetched from Cache!
        Integer b = 100; // Translates to Integer.valueOf(100) -> Reuses SAME object!

        System.out.println(">>> 1. Comparing Cached Integers (Value = 100):");
        System.out.println("  a == b            : " + (a == b) + " (TRUE: Points to same cached instance in RAM!)");
        System.out.println("  a.equals(b)       : " + a.equals(b) + " (TRUE)");

        // 2. Values OUTSIDE the cache range (> 127):
        Integer x = 200; // Translates to Integer.valueOf(200) -> Allocates NEW Heap object!
        Integer y = 200; // Translates to Integer.valueOf(200) -> Allocates ANOTHER Heap object!

        System.out.println("\n>>> 2. Comparing Non-Cached Integers (Value = 200):");
        System.out.println("  x == y            : " + (x == y) + " (FALSE: Distinct objects on Heap!)");
        System.out.println("  x.equals(y)       : " + x.equals(y) + " (TRUE: Characters/Values are equal)");

        System.out.println("\n>>> GOLDEN RULE: NEVER compare Wrapper Objects with '==', ALWAYS use '.equals()'!");

        System.out.println("\n==========================================================================");
    }
}