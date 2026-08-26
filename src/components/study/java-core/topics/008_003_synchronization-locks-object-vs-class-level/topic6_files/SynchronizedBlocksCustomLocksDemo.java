/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 6: Synchronized Statements / Blocks: Locking on Specific Target Objects
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class DualRegisterSystem {

    private int studentCount = 0;
    private int facultyCount = 0;

    // 2 Separate Lock Objects for 2 Independent Critical Sections:
    private final Object studentLock = new Object();
    private final Object facultyLock = new Object();

    // 1. Updating Students (Acquires ONLY studentLock):
    public void addStudent(String name) {
        // Non-critical preparation code (runs concurrently!):
        String formattedName = name.toUpperCase();

        // Critical Section (Locked on studentLock):
        synchronized (studentLock) {
            studentCount++;
            System.out.printf("[%s] Added Student: %s (Total: %d)%n",
                    Thread.currentThread().getName(), formattedName, studentCount);
        }
    }

    // 2. Updating Faculty (Acquires ONLY facultyLock):
    public void addFaculty(String name) {
        String formattedName = name.toUpperCase();

        // Critical Section (Locked on facultyLock):
        synchronized (facultyLock) {
            facultyCount++;
            System.out.printf("[%s] Added Faculty: %s (Total: %d)%n",
                    Thread.currentThread().getName(), formattedName, facultyCount);
        }
    }
}

public class SynchronizedBlocksCustomLocksDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: SYNCHRONIZED BLOCKS & CUSTOM LOCKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        DualRegisterSystem system = new DualRegisterSystem();

        // Thread 1 adds students while Thread 2 adds faculty SIMULTANEOUSLY without blocking each other!
        Thread studentThread = new Thread(() -> {
            system.addStudent("Swadeep");
            system.addStudent("Tuhina");
        }, "Student-Thread");

        Thread facultyThread = new Thread(() -> {
            system.addFaculty("Sukanta Hui");
            system.addFaculty("Subhashis Sir");
        }, "Faculty-Thread");

        studentThread.start();
        facultyThread.start();

        studentThread.join();
        facultyThread.join();

        System.out.println("\n>>> BENEFIT OF SYNCHRONIZED BLOCKS WITH DUAL LOCK OBJECTS:");
        System.out.println("  - Adding students and adding faculty are independent operations.");
        System.out.println("  - By locking on separate 'studentLock' and 'facultyLock' objects, both threads execute concurrently with ZERO blocking contention!");

        System.out.println("\n==========================================================================");
    }
}