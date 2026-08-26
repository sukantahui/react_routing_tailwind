/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 9: Contract Rule 2: Hash Collisions (Same hashCode does NOT imply equals)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class HashCollisionMechanicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: HASH COLLISIONS & RULE 2 OF THE CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Classic Java String Hash Collision:
        // "FB" and "Ea" produce the EXACT SAME hashCode in Java!
        String s1 = "FB";
        String s2 = "Ea";

        System.out.println(">>> Famous String Hash Collision in Java:");
        System.out.println("  s1 ("FB").hashCode() : " + s1.hashCode());
        System.out.println("  s2 ("Ea").hashCode() : " + s2.hashCode());
        System.out.println("  s1.hashCode() == s2.hashCode() : " + (s1.hashCode() == s2.hashCode()) + " (Identical Hash!)");
        System.out.println("  s1.equals(s2)                  : " + s1.equals(s2) + " (Completely Different Strings!)");

        System.out.println("\n>>> How HashMap handles Hash Collisions:");
        System.out.println("  1. 'FB' and 'Ea' land in the SAME bucket.");
        System.out.println("  2. HashMap stores both entries in a LinkedList / Red-Black Tree inside that bucket.");
        System.out.println("  3. When looking up 'FB', HashMap loops through that bucket and uses 'equals()' to pick 'FB'!");

        System.out.println("\n==========================================================================");
    }
}