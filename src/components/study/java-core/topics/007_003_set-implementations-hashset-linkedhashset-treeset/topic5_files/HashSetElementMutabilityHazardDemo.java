/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 5: The Mutability Hazard: Why Elements Placed in HashSet MUST Have Immutable Hash Fields
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

class MutableStudentKey {
    private int id; // MUTABLE FIELD!
    private String name;

    public MutableStudentKey(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public void setId(int id) { this.id = id; } // DANGEROUS MUTATOR!

    @Override
    public int hashCode() { return Objects.hash(id); }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        MutableStudentKey other = (MutableStudentKey) obj;
        return this.id == other.id;
    }

    @Override
    public String toString() { return "Student[id=" + id + ", name=" + name + "]"; }
}

public class HashSetElementMutabilityHazardDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: MUTABILITY HAZARD IN HASH-BASED SETS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Set<MutableStudentKey> studentSet = new HashSet<>();
        MutableStudentKey student = new MutableStudentKey(101, "Swadeep Paul");

        studentSet.add(student);
        System.out.println(">>> 1. Added student with ID 101:");
        System.out.println("  Contains student? : " + studentSet.contains(student) + " (Found in bucket for 101)");

        // DANGEROUS MUTATION: Mutating the key AFTER storing it in the Set:
        student.setId(999);
        System.out.println("\n>>> 2. Mutated Student ID from 101 -> 999:");
        System.out.println("  Contains student? : " + studentSet.contains(student) + " (LOST IN THE SET!)");
        System.out.println("  Set size          : " + studentSet.size() + " (Still contains 1 element, but unreachable!)");

        System.out.println("\n>>> WHY DID THE ELEMENT DISAPPEAR?");
        System.out.println("  1. When added, hashCode was calculated using id=101 -> placed in Bucket A.");
        System.out.println("  2. When id was mutated to 999, contains() recalculates hashCode using id=999 -> looks in Bucket B!");
        System.out.println("  3. Bucket B is EMPTY! The element is trapped in Bucket A forever (Memory Leak & Unreachable Object)!");
        System.out.println("  4. GOLDEN RULE: Fields used in equals/hashCode MUST be declared 'final' and immutable!");

        System.out.println("\n==========================================================================");
    }
}