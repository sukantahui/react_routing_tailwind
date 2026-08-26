/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 15: Why Copy Constructors & Static Factory Methods Are Preferred Over clone()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class CopyConstructorVsCloneDemo {

    public static class TraineeBadge {
        private final int badgeId;
        private final String studentName;

        // 1. Primary Constructor
        public TraineeBadge(int id, String name) {
            this.badgeId = id;
            this.studentName = name;
        }

        // 2. COPY CONSTRUCTOR (Effective Java Item 13 Recommendation):
        // No Cloneable interface, no checked exceptions, no casting, supports final fields!
        public TraineeBadge(TraineeBadge other) {
            this.badgeId = other.badgeId;
            this.studentName = other.studentName;
        }

        // 3. STATIC FACTORY COPY METHOD:
        public static TraineeBadge newInstance(TraineeBadge other) {
            return new TraineeBadge(other.badgeId, other.studentName);
        }

        public void printInfo() {
            System.out.printf("  [BADGE] ID: %d | Name: %s\n", badgeId, studentName);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: COPY CONSTRUCTORS VS clone() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeBadge original = new TraineeBadge(101, "Swadeep Paul");

        // Using Copy Constructor:
        TraineeBadge copy1 = new TraineeBadge(original);

        // Using Static Factory Method:
        TraineeBadge copy2 = TraineeBadge.newInstance(original);

        System.out.println(">>> 1. Original:");
        original.printInfo();

        System.out.println("\n>>> 2. Cloned via Copy Constructor:");
        copy1.printInfo();

        System.out.println("\n>>> 3. Cloned via Static Factory Copy:");
        copy2.printInfo();

        System.out.println("\n>>> Why Copy Constructors Win (Joshua Bloch):");
        System.out.println("  ✔ They do not bypass object construction.");
        System.out.println("  ✔ They work seamlessly with 'final' fields (clone() cannot modify final fields!).");
        System.out.println("  ✔ Zero checked exceptions ('CloneNotSupportedException') or typecasting required.");

        System.out.println("\n==========================================================================");
    }
}