/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 10: Hardware CAS (Compare-And-Swap / Compare-And-Set): LOCK CMPXCHG
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.atomic.AtomicInteger;

public class HardwareCompareAndSwapCasDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: HARDWARE CAS (COMPARE-AND-SWAP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AtomicInteger balance = new AtomicInteger(1000);

        System.out.println(">>> 1. HOW CAS (COMPARE-AND-SWAP) OPERATES:");
        System.out.println("  - CAS takes 3 parameters: (MemoryAddress, ExpectedCurrentValue, NewUpdateValue).");
        System.out.println("  - CAS Rule: 'Update value to NewUpdateValue IF AND ONLY IF current value equals ExpectedCurrentValue'.");
        System.out.println();

        // 1. Successful CAS (Expected = 1000, Update = 1500):
        boolean success1 = balance.compareAndSet(1000, 1500);
        System.out.printf("  Attempt 1: compareAndSet(1000, 1500) -> SUCCESS? %b | Current Balance: ₹%d%n",
                success1, balance.get());

        // 2. Failed CAS (Expected = 1000, but actual is now 1500!):
        boolean success2 = balance.compareAndSet(1000, 2000);
        System.out.printf("  Attempt 2: compareAndSet(1000, 2000) -> SUCCESS? %b | Current Balance: ₹%d%n",
                success2, balance.get());

        System.out.println("\n>>> HARDWARE INSTRUCTION EXECUTION:");
        System.out.println("  - On x86 CPUs, CAS maps directly to a SINGLE atomic assembly instruction: 'LOCK CMPXCHG'.");
        System.out.println("  - Zero OS context switches, zero thread sleeping, 100% lock-free hardware atomicity!");

        System.out.println("\n==========================================================================");
    }
}