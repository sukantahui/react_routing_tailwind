/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 12: The 'instanceof' Operator: Safe Type Verification Before Downcasting
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class InstanceOfOperatorSafeDowncastingDemo {

    public interface AcademyAttendee {}

    public static class StudentAttendee implements AcademyAttendee {
        public void takeLabTest() { System.out.println("  [STUDENT] Completing Spring Boot lab exam!"); }
    }

    public static class GuestLecturer implements AcademyAttendee {
        public void deliverKeynote() { System.out.println("  [GUEST] Delivering AI Architecture keynote!"); }
    }

    public static void processAttendee(AcademyAttendee attendee) {
        // Safe Type Check using 'instanceof' operator:
        if (attendee instanceof StudentAttendee) {
            StudentAttendee student = (StudentAttendee) attendee; // 100% Safe Downcast
            student.takeLabTest();
        } else if (attendee instanceof GuestLecturer) {
            GuestLecturer guest = (GuestLecturer) attendee; // 100% Safe Downcast
            guest.deliverKeynote();
        } else {
            System.out.println("  [UNKNOWN] Generic attendee.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: 'instanceof' OPERATOR SAFETY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyAttendee a1 = new StudentAttendee();
        AcademyAttendee a2 = new GuestLecturer();

        System.out.println(">>> 1. Processing Student Attendee (Swadeep):");
        processAttendee(a1);

        System.out.println("\n>>> 2. Processing Guest Lecturer (Sukanta Hui):");
        processAttendee(a2);

        System.out.println("\n>>> 3. Checking null with instanceof (Always evaluates to false, never throws NPE!):");
        System.out.println("  (null instanceof StudentAttendee)? " + (null instanceof StudentAttendee));

        System.out.println("\n==========================================================================");
    }
}