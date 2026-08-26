/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 2: The Contract of compareTo(): Negative (< 0), Zero (== 0) & Positive (> 0)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class CompareToReturnContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE 3-WAY RETURN CONTRACT OF compareTo() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Integer a = 10;
        Integer b = 20;
        Integer c = 10;

        int result1 = a.compareTo(b); // 10 vs 20 -> Negative (< 0)
        int result2 = a.compareTo(c); // 10 vs 10 -> Zero (== 0)
        int result3 = b.compareTo(a); // 20 vs 10 -> Positive (> 0)

        System.out.println(">>> 1. Mathematical Sign Results:");
        System.out.println("  10.compareTo(20) : " + result1 + " (Negative: 'this' comes BEFORE 'other')");
        System.out.println("  10.compareTo(10) : " + result2 + " (Zero    : 'this' EQUALS 'other')");
        System.out.println("  20.compareTo(10) : " + result3 + " (Positive: 'this' comes AFTER 'other')");

        System.out.println("\n>>> CRITICAL WARNING ON INTEGER SUBTRACTION IN compareTo():");
        System.out.println("  - BAD CODE : 'return this.id - other.id;'");
        System.out.println("  - DANGER   : If this.id is negative and other.id is large positive, Integer Overflow will reverse the sign!");
        System.out.println("  - SAFE CODE: Always use 'Integer.compare(this.id, other.id)' or 'Double.compare()'!");

        System.out.println("\n==========================================================================");
    }
}