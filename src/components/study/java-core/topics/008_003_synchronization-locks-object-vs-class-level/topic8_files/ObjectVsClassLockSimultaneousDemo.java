/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 8: Object-Level Lock vs Class-Level Lock: Non-Interfering Simultaneous Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class InstitutePortal {

    // 1. INSTANCE METHOD (Acquires Object-Level Lock on 'this'):
    public synchronized void printStudentBadge(String studentName) {
        System.out.printf("[%s] START printStudentBadge for %s (Holding OBJECT-level lock: %s)...%n",
                Thread.currentThread().getName(), studentName, this.hashCode());
        try { Thread.sleep(400); } catch (InterruptedException ignored) {}
        System.out.printf("[%s] END printStudentBadge for %s%n",
                Thread.currentThread().getName(), studentName);
    }

    // 2. STATIC METHOD (Acquires Class-Level Lock on 'InstitutePortal.class'):
    public static synchronized void generateGlobalAuditReport() {
        System.out.printf("[%s] START generateGlobalAuditReport (Holding CLASS-level lock: %s)...%n",
                Thread.currentThread().getName(), InstitutePortal.class.getName());
        try { Thread.sleep(400); } catch (InterruptedException ignored) {}
        System.out.printf("[%s] END generateGlobalAuditReport%n",
                Thread.currentThread().getName());
    }
}

public class ObjectVsClassLockSimultaneousDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: OBJECT LOCK vs CLASS LOCK SIMULTANEOUS EXECUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        InstitutePortal portalInstance = new InstitutePortal();

        // Thread 1 calls synchronized INSTANCE method:
        Thread instanceThread = new Thread(() -> {
            portalInstance.printStudentBadge("Swadeep Paul");
        }, "Instance-Lock-Thread");

        // Thread 2 calls synchronized STATIC method:
        Thread classThread = new Thread(() -> {
            InstitutePortal.generateGlobalAuditReport();
        }, "Class-Lock-Thread");

        long start = System.currentTimeMillis();

        instanceThread.start();
        classThread.start();

        instanceThread.join();
        classThread.join();

        long duration = System.currentTimeMillis() - start;
        System.out.printf("\n>>> Total Execution Time: %d ms (Completed in parallel ~400 ms!)%n", duration);

        System.out.println("\n>>> WHY DID BOTH THREADS RUN CONCURRENTLY WITHOUT BLOCKING?");
        System.out.println("  1. 'instanceThread' acquired the lock on the 'portalInstance' object in Heap memory.");
        System.out.println("  2. 'classThread' acquired the lock on the 'InstitutePortal.class' object in Metaspace.");
        System.out.println("  3. These are TWO ENTIRELY SEPARATE LOCK OBJECTS! Neither thread blocked the other!");

        System.out.println("\n==========================================================================");
    }
}