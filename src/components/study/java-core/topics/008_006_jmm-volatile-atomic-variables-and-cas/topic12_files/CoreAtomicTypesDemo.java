/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 12: Core Atomic Types: AtomicInteger, AtomicLong, AtomicBoolean & AtomicReference
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

class StudentRegistration {
    final String studentName;
    final String course;

    public StudentRegistration(String studentName, String course) {
        this.studentName = studentName;
        this.course = course;
    }

    @Override
    public String toString() {
        return studentName + " enrolled in " + course;
    }
}

public class CoreAtomicTypesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: CORE ATOMIC PRIMITIVE & REFERENCE TYPES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. AtomicInteger:
        AtomicInteger activeStudents = new AtomicInteger(100);
        activeStudents.addAndGet(5);
        System.out.println(">>> 1. AtomicInteger (Active Students): " + activeStudents.get());

        // 2. AtomicLong:
        AtomicLong totalTuitionFeeCollected = new AtomicLong(250000L);
        totalTuitionFeeCollected.addAndGet(15000L);
        System.out.printf(">>> 2. AtomicLong (Tuition Revenue): ₹%,d%n", totalTuitionFeeCollected.get());

        // 3. AtomicBoolean:
        AtomicBoolean isRegistrationOpen = new AtomicBoolean(true);
        boolean wasOpen = isRegistrationOpen.compareAndSet(true, false); // Atomic toggle
        System.out.printf(">>> 3. AtomicBoolean (Registration Closed?): %b (Was open: %b)%n",
                !isRegistrationOpen.get(), wasOpen);

        // 4. AtomicReference (Lock-Free Object Reference Updates):
        StudentRegistration initialStudent = new StudentRegistration("Swadeep Paul", "GST Executive");
        AtomicReference<StudentRegistration> topRanker = new AtomicReference<>(initialStudent);

        StudentRegistration newRanker = new StudentRegistration("Tuhina Das", "Advanced Java Core");
        boolean swapped = topRanker.compareAndSet(initialStudent, newRanker);

        System.out.println(">>> 4. AtomicReference Update Status: " + swapped);
        System.out.println("  Current Top Ranker: " + topRanker.get());

        System.out.println("\n==========================================================================");
    }
}