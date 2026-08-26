/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 11: TreeSet Does NOT Use equals/hashCode: compareTo() / compare() == 0 Dictates Uniqueness
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

class StudentFeeAccount implements Comparable<StudentFeeAccount> {
    private final int studentId;
    private final String name;
    private final double feeAmount;

    public StudentFeeAccount(int studentId, String name, double feeAmount) {
        this.studentId = studentId;
        this.name = name;
        this.feeAmount = feeAmount;
    }

    // equals() compares ONLY studentId:
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        StudentFeeAccount other = (StudentFeeAccount) obj;
        return this.studentId == other.studentId;
    }

    @Override
    public int hashCode() { return Integer.hashCode(studentId); }

    // compareTo() compares ONLY feeAmount (Inconsistent with equals!):
    @Override
    public int compareTo(StudentFeeAccount other) {
        return Double.compare(this.feeAmount, other.feeAmount);
    }

    @Override
    public String toString() {
        return String.format("Account[ID=%d, Name=%s, Fee=₹%.0f]", studentId, name, feeAmount);
    }
}

public class TreeSetCompareToUniquenessTrapDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: TreeSet compareTo() == 0 UNIQUENESS TRAP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentFeeAccount acc1 = new StudentFeeAccount(101, "Swadeep Paul", 5000);
        StudentFeeAccount acc2 = new StudentFeeAccount(102, "Tuhina Das", 5000); // DIFFERENT ID, SAME FEE!

        // 1. In HashSet (Uses equals & hashCode):
        Set<StudentFeeAccount> hashSet = new HashSet<>();
        hashSet.add(acc1);
        hashSet.add(acc2); // Admitted because studentId 101 != 102!
        System.out.println(">>> 1. HashSet Evaluation (Uses equals):");
        System.out.println("  HashSet Size : " + hashSet.size() + " (Both admitted because IDs are different!)");

        // 2. In TreeSet (Uses compareTo == 0, IGNORES equals/hashCode!):
        Set<StudentFeeAccount> treeSet = new TreeSet<>();
        treeSet.add(acc1);
        boolean addedAcc2 = treeSet.add(acc2); // REJECTED because compareTo returned 0 (same fee ₹5000)!
        System.out.println("\n>>> 2. TreeSet Evaluation (Uses compareTo):");
        System.out.println("  Was acc2 admitted into TreeSet? : " + addedAcc2 + " (REJECTED!)");
        System.out.println("  TreeSet Size                    : " + treeSet.size() + " (Tuhina was dropped!)");

        System.out.println("\n>>> THE CRITICAL ARCHITECTURAL DIFFERENCE:");
        System.out.println("  1. HashSet/LinkedHashSet enforce uniqueness via 'equals()' and 'hashCode()'.");
        System.out.println("  2. TreeSet enforces uniqueness SOLELY via 'compareTo() == 0' or 'compare() == 0'.");
        System.out.println("  3. Effective Java Warning: Always ensure compareTo() is CONSISTENT WITH equals() to avoid silent data loss!");

        System.out.println("\n==========================================================================");
    }
}