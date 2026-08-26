/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 4: Tricky Riddle 5 - Integer Cache Equality (-128 to 127)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

public class TrickyRiddle5IntegerCacheEqualityDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 5: INTEGER CACHE EQUALITY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Integer a = 100;
        Integer b = 100;
        System.out.println("1. Integer a = 100, b = 100 (Within Cache -128..127):");
        System.out.println("   a == b          -> " + (a == b)); // TRUE (Same Flyweight Object)
        System.out.println("   a.equals(b)     -> " + a.equals(b)); // TRUE

        Integer x = 200;
        Integer y = 200;
        System.out.println("
2. Integer x = 200, y = 200 (Outside Cache):");
        System.out.println("   x == y          -> " + (x == y)); // FALSE! (Two distinct heap objects!)
        System.out.println("   x.equals(y)     -> " + x.equals(y)); // TRUE (Value equality)

        System.out.println("
3. Explicit 'new Integer(100)' (Deprecated):");
        Integer custom = new Integer(100);
        System.out.println("   custom == a     -> " + (custom == a)); // FALSE (Explicit heap instantiation)

        System.out.println("\n==========================================================================");
    }
}
