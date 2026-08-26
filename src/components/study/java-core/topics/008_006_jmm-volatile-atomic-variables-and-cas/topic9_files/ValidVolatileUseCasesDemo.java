/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 9: Valid Use Cases for volatile: Flags & Double-Checked Locking Singleton
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

// 1. PRODUCTION-GRADE DOUBLE-CHECKED LOCKING SINGLETON (Safe Publication with volatile):
class CentralTaxRegistrySingleton {

    // CRITICAL: MUST BE 'volatile' TO PREVENT PARTIAL INITIALIZATION REORDERING!
    private static volatile CentralTaxRegistrySingleton instance = null;

    private final String hqLocation;

    private CentralTaxRegistrySingleton() {
        this.hqLocation = "Barrackpore Central Hub, West Bengal";
        // Simulating heavy initialization
    }

    public static CentralTaxRegistrySingleton getInstance() {
        // First check (no synchronization for 99.9% of calls!):
        if (instance == null) {
            synchronized (CentralTaxRegistrySingleton.class) {
                // Second check (inside lock to ensure only 1 thread instantiates):
                if (instance == null) {
                    // Without 'volatile', JVM can reorder 'instance = memory_address'
                    // BEFORE constructor finishes, exposing a half-initialized object to other threads!
                    instance = new CentralTaxRegistrySingleton();
                }
            }
        }
        return instance;
    }

    public String getHqLocation() { return hqLocation; }
}

public class ValidVolatileUseCasesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: VALID USE CASES FOR volatile & DCL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CentralTaxRegistrySingleton registry = CentralTaxRegistrySingleton.getInstance();
        System.out.println(">>> Singleton Initialized Safely via volatile DCL:");
        System.out.println("  Location: " + registry.getHqLocation());

        System.out.println("\n>>> THE 2 CANONICAL VALID USE CASES FOR volatile IN JAVA:");
        System.out.println("  1. Status / Shutdown Flags        : 'private volatile boolean running = true;' (Simple read/write flag with no compound mutations).");
        System.out.println("  2. Double-Checked Locking (DCL)  : 'private static volatile Singleton instance;' (Prevents out-of-order partial initialization).");

        System.out.println("\n==========================================================================");
    }
}