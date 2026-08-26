/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 4: Broken equals() & hashCode() in Hash Collections - Silent Memory Leaks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class BrokenEqualsHashCodeLeaksDemo {

    // Mutable Key Class (Dangerous for Hash collections!):
    public static class MutableStudentKey {
        public int studentId;
        public String center;

        public MutableStudentKey(int id, String center) {
            this.studentId = id;
            this.center = center;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            MutableStudentKey that = (MutableStudentKey) o;
            return studentId == that.studentId && Objects.equals(center, that.center);
        }

        @Override
        public int hashCode() {
            return Objects.hash(studentId, center);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: BROKEN HASH KEYS & MUTABLE LEAKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Set<MutableStudentKey> activeStudents = new HashSet<>();

        MutableStudentKey key = new MutableStudentKey(101, "Barrackpore");
        activeStudents.add(key);
        System.out.println("1. Added Student Key 101 (Barrackpore). Set Size: " + activeStudents.size());

        // DANGEROUS MUTATION: Mutating field changes the hashCode calculation!
        key.center = "Naihati Center"; // Hash code has now changed!

        System.out.println("\n>>> 2. ATTEMPTING TO REMOVE MUTATED KEY FROM SET:");
        boolean removed = activeStudents.remove(key);
        System.out.println("  - Did remove() succeed? : " + removed + " (FAILED! ❌)");
        System.out.println("  - Current Set Size      : " + activeStudents.size() + " (Item is TRAPPED in memory forever!)");

        System.out.println("\n>>> GOLDEN RULE:");
        System.out.println("  - ALWAYS make Map keys and Set elements IMMUTABLE (Use Java Records or 'final' fields)!");
        System.out.println("==========================================================================");
    }
}
