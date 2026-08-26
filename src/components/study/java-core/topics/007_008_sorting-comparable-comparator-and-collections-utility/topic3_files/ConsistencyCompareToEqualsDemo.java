/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 3: Consistency Between compareTo() and equals(): (x.compareTo(y) == 0) == (x.equals(y))
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class ConsistencyCompareToEqualsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: CONSISTENCY BETWEEN compareTo() & equals() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // BigDecimal: The Classic Standard Library Inconsistency Example:
        BigDecimal val1 = new BigDecimal("1.0");
        BigDecimal val2 = new BigDecimal("1.00");

        System.out.println(">>> 1. Comparing '1.0' vs '1.00':");
        System.out.println("  equals() evaluation    : " + val1.equals(val2) + " (FALSE! Scale 1 != Scale 2)");
        System.out.println("  compareTo() evaluation : " + val1.compareTo(val2) + " (ZERO! Numerically equal!)");

        // In HashSet (Uses equals):
        Set<BigDecimal> hashSet = new HashSet<>();
        hashSet.add(val1);
        hashSet.add(val2);
        System.out.println("\n>>> 2. Behavior in HashSet (Uses equals):");
        System.out.println("  HashSet Size: " + hashSet.size() + " (Both admitted because equals() returned false!)");

        // In TreeSet (Uses compareTo == 0):
        Set<BigDecimal> treeSet = new TreeSet<>();
        treeSet.add(val1);
        treeSet.add(val2);
        System.out.println("\n>>> 3. Behavior in TreeSet (Uses compareTo):");
        System.out.println("  TreeSet Size: " + treeSet.size() + " (Duplicate rejected because compareTo returned 0!)");

        System.out.println("\n>>> THE GOLDEN RULE OF COMPARABLE (Effective Java Item 14):");
        System.out.println("  - Strongly recommended: '(x.compareTo(y) == 0) == (x.equals(y))'.");
        System.out.println("  - If your class violates consistency, clearly document it in Javadoc to prevent silent bugs in sorted sets/maps!");

        System.out.println("\n==========================================================================");
    }
}