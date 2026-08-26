/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 14: Cloning Objects Containing Nested Mutable References (Implementing Deep Copy)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class SafeDeepCopyCloningDemo {

    // Nested Class implementing Cloneable:
    public static class AcademyAddress implements Cloneable {
        public String street;
        public String city;

        public AcademyAddress(String street, String city) {
            this.street = street;
            this.city = city;
        }

        @Override
        public AcademyAddress clone() {
            try {
                return (AcademyAddress) super.clone();
            } catch (CloneNotSupportedException e) {
                throw new AssertionError();
            }
        }
    }

    // Outer Class implementing TRUE DEEP COPY:
    public static class EnrolledStudent implements Cloneable {
        public String name;
        public AcademyAddress address; // Nested mutable reference

        public EnrolledStudent(String name, AcademyAddress addr) {
            this.name = name;
            this.address = addr;
        }

        // DEEP COPY IMPLEMENTATION:
        @Override
        public EnrolledStudent clone() {
            try {
                // 1. First perform shallow copy of outer object
                EnrolledStudent copy = (EnrolledStudent) super.clone();
                // 2. Explicitly DEEP-CLONE all nested mutable reference objects!
                if (this.address != null) {
                    copy.address = this.address.clone();
                }
                return copy;
            } catch (CloneNotSupportedException e) {
                throw new AssertionError();
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: SAFE DEEP COPY CLONING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyAddress addr = new AcademyAddress("Station Road", "Barrackpore");
        EnrolledStudent s1 = new EnrolledStudent("Swadeep Paul", addr);
        EnrolledStudent s2 = s1.clone(); // True Deep Copy!

        System.out.println(">>> 1. Mutating s2.address.city = 'Naihati'...");
        s2.address.city = "Naihati";

        System.out.println("\n>>> 2. Verifying Complete Memory Isolation:");
        System.out.println("  s1.address.city (Original): " + s1.address.city + " (Safe & Unaffected!)");
        System.out.println("  s2.address.city (Cloned)  : " + s2.address.city);
        System.out.println("  s1.address == s2.address  : " + (s1.address == s2.address) + " (Independent Heap Objects!)");

        System.out.println("\n==========================================================================");
    }
}