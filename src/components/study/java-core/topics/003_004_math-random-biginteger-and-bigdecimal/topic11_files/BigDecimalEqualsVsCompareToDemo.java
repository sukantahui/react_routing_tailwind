/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 11: BigDecimal Comparison: compareTo() vs equals() (The Scale Trap)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class BigDecimalEqualsVsCompareToDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: BigDecimal equals() vs compareTo() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BigDecimal d1 = new BigDecimal("2.0");
        BigDecimal d2 = new BigDecimal("2.00");

        System.out.println(">>> 1. Comparing '2.0' (scale=1) vs '2.00' (scale=2):");
        System.out.println("  d1.scale() : " + d1.scale());
        System.out.println("  d2.scale() : " + d2.scale());

        System.out.println("\n>>> 2. Equality Testing:");
        System.out.println("  d1.equals(d2)          : " + d1.equals(d2) + " (FALSE! equals checks BOTH numeric value AND scale!)");
        System.out.println("  d1.compareTo(d2) == 0  : " + (d1.compareTo(d2) == 0) + " (TRUE! compareTo compares ONLY mathematical value)");

        System.out.println("\n>>> 3. Impact on Collections (HashSet vs TreeSet):");
        Set<BigDecimal> hashSet = new HashSet<>();
        hashSet.add(d1);
        hashSet.add(d2);
        System.out.println("  HashSet size (uses equals)    : " + hashSet.size() + " (Contains BOTH 2.0 and 2.00!)");

        Set<BigDecimal> treeSet = new TreeSet<>();
        treeSet.add(d1);
        treeSet.add(d2);
        System.out.println("  TreeSet size (uses compareTo) : " + treeSet.size() + " (Contains ONLY 1 element!)");

        System.out.println("\n>>> GOLDEN RULE: ALWAYS compare BigDecimal numerical values with 'compareTo() == 0'!");

        System.out.println("\n==========================================================================");
    }
}