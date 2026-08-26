/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 5: Synchronized Static Methods: Class-Level Locks (ClassName.class Monitor)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class RegionalTaxRegistry {

    private static int globalRegistrationCount = 0;

    // 1. SYNCHRONIZED STATIC METHOD (Acquires Class-Level Lock on RegionalTaxRegistry.class):
    public static synchronized void registerNewStudent(String branchName, String studentName) {
        // Exactly equivalent to: synchronized(RegionalTaxRegistry.class) { ... }
        int current = globalRegistrationCount;
        try { Thread.sleep(50); } catch (InterruptedException ignored) {}
        globalRegistrationCount = current + 1;
        System.out.printf("[%s] Registered %s at %s. Total Enrolled: %d%n",
                Thread.currentThread().getName(), studentName, branchName, globalRegistrationCount);
    }

    public static int getGlobalCount() { return globalRegistrationCount; }
}

public class SynchronizedStaticMethodsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: SYNCHRONIZED STATIC METHODS (CLASS-LEVEL LOCK) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread t1 = new Thread(() -> RegionalTaxRegistry.registerNewStudent("Barrackpore", "Swadeep"), "Thread-Barrackpore");
        Thread t2 = new Thread(() -> RegionalTaxRegistry.registerNewStudent("Naihati", "Tuhina"), "Thread-Naihati");
        Thread t3 = new Thread(() -> RegionalTaxRegistry.registerNewStudent("Shyamnagar", "Abhronila"), "Thread-Shyamnagar");

        t1.start();
        t2.start();
        t3.start();

        t1.join();
        t2.join();
        t3.join();

        System.out.println("\n>>> FINAL GLOBAL REGISTRATION COUNT: " + RegionalTaxRegistry.getGlobalCount());

        System.out.println("\n>>> HOW CLASS-LEVEL LOCKS OPERATE:");
        System.out.println("  1. When a thread calls a 'synchronized static' method, it acquires the intrinsic lock on the 'Class' object ('RegionalTaxRegistry.class') in Metaspace.");
        System.out.println("  2. Only ONE thread in the ENTIRE JVM can execute ANY synchronized static method of that class at any given time, regardless of how many instances exist!");

        System.out.println("\n==========================================================================");
    }
}