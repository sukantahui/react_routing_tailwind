/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 1: The java.lang.Comparable<T> Interface: Single Method 'int compareTo(T o)'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class BranchOffice implements Comparable<BranchOffice> {
    private final int branchCode;
    private final String location;

    public BranchOffice(int branchCode, String location) {
        this.branchCode = branchCode;
        this.location = location;
    }

    public int getBranchCode() { return branchCode; }
    public String getLocation() { return location; }

    // Implementing single contract method of java.lang.Comparable<T>:
    @Override
    public int compareTo(BranchOffice other) {
        // Compares 'this' against 'other':
        return Integer.compare(this.branchCode, other.branchCode);
    }

    @Override
    public String toString() {
        return String.format("Branch[Code=%d, Location=%s]", branchCode, location);
    }
}

public class ComparableInterfaceContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: java.lang.Comparable<T> CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<BranchOffice> branches = new ArrayList<>();
        branches.add(new BranchOffice(700120, "Barrackpore Central"));
        branches.add(new BranchOffice(700123, "Shyamnagar Hub"));
        branches.add(new BranchOffice(700121, "Ichapur Extension"));
        branches.add(new BranchOffice(700122, "Naihati Center"));

        System.out.println(">>> 1. Unsorted Branches:");
        branches.forEach(b -> System.out.println("  " + b));

        // Collections.sort() uses Comparable.compareTo() automatically:
        Collections.sort(branches);

        System.out.println("\n>>> 2. Sorted Branches by Postal Branch Code (Comparable.compareTo):");
        branches.forEach(b -> System.out.println("  " + b));

        System.out.println("\n==========================================================================");
    }
}