/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 11: Using 'super()' to Invoke Parent Class Constructors
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class SuperConstructorInvocationDemo {

    // Parent Class (Parameterized Constructor Only)
    public static class Person {
        private final String fullName;
        private final String residentialCity;

        public Person(String fullName, String residentialCity) {
            this.fullName = fullName;
            this.residentialCity = residentialCity;
            System.out.printf("  [PARENT Person <init>] Name: %s | City: %s\n", fullName, residentialCity);
        }

        public String getFullName() { return fullName; }
        public String getCity() { return residentialCity; }
    }

    // Subclass (Must explicitly invoke super(name, city))
    public static class TraineeCandidate extends Person {
        private final int rollId;
        private final String courseTrack;

        public TraineeCandidate(String fullName, String city, int rollId, String courseTrack) {
            // Explicit call to parent parameterized constructor on LINE 1
            super(fullName, city);

            this.rollId = rollId;
            this.courseTrack = courseTrack;
            System.out.printf("  [CHILD TraineeCandidate <init>] Roll: %d | Track: %s\n", rollId, courseTrack);
        }

        public void printBadge() {
            System.out.printf("  -> [%d] %s (%s) enrolled in %s\n", rollId, getFullName(), getCity(), courseTrack);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: USING 'super()' TO INVOKE PARENT CONSTRUCTOR - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeCandidate swadeep = new TraineeCandidate("Swadeep Paul", "Barrackpore", 101, "Core Java Pro");
        swadeep.printBadge();

        System.out.println("\n==========================================================================");
    }
}