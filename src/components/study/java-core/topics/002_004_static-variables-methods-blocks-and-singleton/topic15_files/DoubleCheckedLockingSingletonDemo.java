/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 15: Thread-Safety in Singleton: Double-Checked Locking (DCL)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class DoubleCheckedLockingSingletonDemo {

    public static class ThreadSafeDatabaseManager {
        // 'volatile' is MANDATORY: Prevents instruction reordering by the JVM JIT compiler!
        private static volatile ThreadSafeDatabaseManager instance;

        private ThreadSafeDatabaseManager() {
            System.out.println("  [THREAD-SAFE DCL] Instance safely created on Heap!");
        }

        // DOUBLE-CHECKED LOCKING (DCL) PATTERN: High-performance thread-safety
        public static ThreadSafeDatabaseManager getInstance() {
            // First check (no locking overhead for existing instance)
            if (instance == null) {
                synchronized (ThreadSafeDatabaseManager.class) {
                    // Second check (inside synchronized lock)
                    if (instance == null) {
                        instance = new ThreadSafeDatabaseManager();
                    }
                }
            }
            return instance;
        }

        public void executeQuery(String sql) {
            System.out.println("  [QUERY EXECUTED] " + sql + " via instance 0x" + Integer.toHexString(System.identityHashCode(this)));
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: DOUBLE-CHECKED LOCKING (DCL) SINGLETON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable task = () -> {
            ThreadSafeDatabaseManager manager = ThreadSafeDatabaseManager.getInstance();
            manager.executeQuery("SELECT * FROM trainees WHERE hub='Barrackpore'");
        };

        Thread t1 = new Thread(task, "Thread-Swadeep");
        Thread t2 = new Thread(task, "Thread-Tuhina");

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n==========================================================================");
    }
}