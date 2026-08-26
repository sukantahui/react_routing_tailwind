/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 13: Scoped Values (JEP 446 / Java 21+): Immutable, Lightweight Context Sharing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class ScopedValuesContextSharingDemo {

    // 1. SCOPED VALUE DECLARATION (Immutable & Lightweight context token):
    // In Java 21+ Preview (java.lang.ScopedValue):
    // public static final ScopedValue<String> CURRENT_USER = ScopedValue.newInstance();

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: Scoped Values (JEP 446) vs ThreadLocal - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY ThreadLocal FAILS WITH MILLIONS OF VIRTUAL THREADS:");
        System.out.println("  1. Memory Bloat          : Every thread allocates an internal ThreadLocalMap; 1,000,000 threads with ThreadLocals = Gigabytes of memory!");
        System.out.println("  2. Mutable State Hazard  : Any method in the call stack can overwrite 'threadLocal.set(val)', creating hard-to-trace bugs.");
        System.out.println("  3. Memory Leaks          : Forgetting to call 'threadLocal.remove()' causes permanent memory leaks in long-lived thread pools.");
        System.out.println();
        System.out.println(">>> THE SCOPED VALUES SOLUTION (JEP 446 / Java 21+):");
        System.out.println("  - Immutable Context Token : Set ONCE in a bounded execution block; cannot be modified by downstream methods.");
        System.out.println("  - Bounded Scope Lifecycle : Context exists ONLY for the duration of 'ScopedValue.where(KEY, val).run(task)'.");
        System.out.println("  - Zero Memory Leaks       : As soon as the bounded lambda finishes, all context is instantly discarded with zero manual cleanup!");

        System.out.println("\n==========================================================================");
    }
}