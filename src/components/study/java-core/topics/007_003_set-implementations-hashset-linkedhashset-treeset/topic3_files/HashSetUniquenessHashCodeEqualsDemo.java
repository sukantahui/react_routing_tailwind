/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 3: How HashSet Determines Uniqueness: hashCode() Lookup & equals() Verification
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

class StudentRegistration {
    private final int rollNumber;
    private final String name;

    public StudentRegistration(int rollNumber, String name) {
        this.rollNumber = rollNumber;
        this.name = name;
    }

    // STEP 1: hashCode() determines which hash bucket to inspect:
    @Override
    public int hashCode() {
        System.out.println("    [hashCode() INVOKED] for roll: " + rollNumber);
        return Objects.hash(rollNumber);
    }

    // STEP 2: equals() is invoked ONLY if a bucket hash collision occurs:
    @Override
    public boolean equals(Object obj) {
        System.out.println("    [equals() INVOKED] comparing with roll: " + rollNumber);
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        StudentRegistration other = (StudentRegistration) obj;
        return this.rollNumber == other.rollNumber;
    }

    @Override
    public String toString() {
        return "Student[Roll=" + rollNumber + ", Name=" + name + "]";
    }
}

public class HashSetUniquenessHashCodeEqualsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: HOW HashSet DETERMINES UNIQUENESS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Set<StudentRegistration> register = new HashSet<>();

        StudentRegistration s1 = new StudentRegistration(101, "Swadeep Paul");
        StudentRegistration s2 = new StudentRegistration(102, "Tuhina Das");
        StudentRegistration s3 = new StudentRegistration(101, "Swadeep Paul (Duplicate Attempt)");

        System.out.println(">>> 1. Adding 1st Student (Roll 101):");
        register.add(s1);

        System.out.println("\n>>> 2. Adding 2nd Student (Roll 102 - Distinct Hash):");
        register.add(s2);

        System.out.println("\n>>> 3. Adding 3rd Student (Roll 101 - Hash Match Triggers equals()):");
        boolean duplicateAdded = register.add(s3);
        System.out.println("  Was duplicate admitted? : " + duplicateAdded + " (Rejected!)");
        System.out.println("  Final Registry Size     : " + register.size());

        System.out.println("\n>>> THE 2-STEP UNIQUENESS VERIFICATION ALGORITHM:");
        System.out.println("  Step 1: Compute 'hash = key.hashCode()'. Locate bucket index '(n - 1) & hash'.");
        System.out.println("  Step 2: If bucket is empty -> insert immediately.");
        System.out.println("  Step 3: If bucket has node -> invoke 'equals()'. If equals returns true -> REJECT as duplicate!");

        System.out.println("\n==========================================================================");
    }
}