/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 9: Copy Constructor: Concept & Manual Deep Object Cloning
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CopyConstructorDeepCloningDemo {

    // Nested Mutable Reference Class: Address
    public static class CampusAddress {
        private String street;
        private String town;

        public CampusAddress(String street, String town) {
            this.street = street;
            this.town = town;
        }

        // Copy constructor for Address (Deep copying)
        public CampusAddress(CampusAddress source) {
            this.street = source.street;
            this.town = source.town;
        }

        public void setTown(String town) { this.town = town; }
        public String toString() { return street + ", " + town; }
    }

    // Domain Class: StudentProfile
    public static class StudentProfile {
        private final int studentId;
        private final String studentName;
        private final CampusAddress address;
        private final List<String> enrolledCourses;

        // Primary Parameterized Constructor
        public StudentProfile(int studentId, String studentName, CampusAddress address, List<String> courses) {
            this.studentId = studentId;
            this.studentName = Objects.requireNonNull(studentName, "Name required");
            this.address = new CampusAddress(address); // Defensive copy at birth
            this.enrolledCourses = new ArrayList<>(courses); // Defensive copy
        }

        // ====================================================================
        // COPY CONSTRUCTOR (Deep Cloning)
        // ====================================================================
        public StudentProfile(StudentProfile source) {
            if (source == null) throw new IllegalArgumentException("Source cannot be null.");
            this.studentId = source.studentId;
            this.studentName = source.studentName;
            // DEEP COPY: Creating a fresh new CampusAddress and ArrayList
            this.address = new CampusAddress(source.address);
            this.enrolledCourses = new ArrayList<>(source.enrolledCourses);
            System.out.printf("  [COPY CONSTRUCTOR] Deep cloned profile for: %s (ID: %d)\n",
                    this.studentName, this.studentId);
        }

        public CampusAddress getAddress() { return address; }
        public List<String> getCourses() { return enrolledCourses; }

        public void display(String label) {
            System.out.printf("  [%s] ID: %d | Name: %s | Address: [%s] | Courses: %s\n",
                    label, studentId, studentName, address, enrolledCourses);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: COPY CONSTRUCTORS & DEEP CLONING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Original Profile for Swadeep Paul (Barrackpore):");
        CampusAddress addr = new CampusAddress("Station Road", "Barrackpore");
        List<String> courses = new ArrayList<>();
        courses.add("Core Java");
        courses.add("Data Structures");

        StudentProfile original = new StudentProfile(101, "Swadeep Paul", addr, courses);
        original.display("ORIGINAL BEFORE MUTATION");

        System.out.println("\n>>> 2. Deep Cloning via Copy Constructor:");
        StudentProfile cloned = new StudentProfile(original);
        cloned.display("CLONED PROFILE");

        System.out.println("\n>>> 3. Mutating the Cloned Profile's Nested Address & Courses:");
        cloned.getAddress().setTown("Shyamnagar");
        cloned.getCourses().add("Spring Boot Pro");

        System.out.println("\n>>> 4. Verification: Original Profile remains 100% UNTOUCHED (Deep Isolation):");
        original.display("ORIGINAL AFTER MUTATION");
        cloned.display("CLONED AFTER MUTATION");

        System.out.println("\n==========================================================================");
    }
}